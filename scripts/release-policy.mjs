import { createHash } from 'node:crypto'
import { lstat, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

// Actualizar solo tras revisar la demo pública y confirmar que sigue siendo neutra.
export const PUBLIC_DEMO_SHA256 = '030d05d134168edb7915013f88bed0c9d762daa793e53fec745f77ba0b04f327'

const placeholderPhrases = [
  'de ejemplo',
  'reemplaza este archivo',
  'reemplaza estos versos',
  'reemplázalo por el tuyo',
  'reemplázala por el logro',
]

function hasKnownPlaceholder(text) {
  const normalized = text.toLocaleLowerCase('es-CL')
  return placeholderPhrases.some((phrase) => normalized.includes(phrase))
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])]),
    )
  }
  return value
}

export function fingerprintBundle(bundle) {
  return createHash('sha256').update(JSON.stringify(canonicalize(bundle))).digest('hex')
}

function collectStrings(value, strings = []) {
  if (typeof value === 'string') strings.push(value)
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, strings))
  else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectStrings(item, strings))
  }
  return strings
}

function contentText(gift) {
  if (!gift.content) return []
  switch (gift.kind) {
    case 'letter':
      return gift.content.paragraphs
    case 'poem':
      return gift.content.stanzas.flat()
    case 'ring':
    case 'achievement':
      return gift.content.message === null ? [] : [gift.content.message]
    case 'robot-memory':
      return gift.content.pairs
    case 'message-garden':
      return gift.content.messages
  }
}

export function validateBundleForMode(bundle, mode) {
  const problems = []
  if (!['public', 'personal'].includes(mode)) {
    return [`Modo desconocido "${mode}"; usa public o personal.`]
  }

  if (bundle.occasions.length === 0) problems.push('El bundle necesita al menos una ocasión.')
  if (!bundle.occasions.some((occasion) => occasion.gifts.length > 0)) {
    problems.push('El bundle necesita al menos un regalo.')
  }

  if (mode === 'public') {
    const fingerprint = fingerprintBundle(bundle)
    if (fingerprint !== PUBLIC_DEMO_SHA256) {
      problems.push(
        'La demo pública difiere de la demo neutra revisada; audita el contenido y actualiza la huella solo si procede.',
      )
    }
    return problems
  }

  if (bundle.site.recipient.trim().toLocaleLowerCase('es-CL') === 'ti') {
    problems.push('site.recipient conserva el valor genérico "ti".')
  }

  for (const [occasionIndex, occasion] of bundle.occasions.entries()) {
    const pathName = `occasions[${occasionIndex}]`
    if (occasion.id === 'demo') problems.push(`${pathName}.id conserva el id de demo "demo".`)

    for (const [giftIndex, gift] of occasion.gifts.entries()) {
      const giftPath = `${pathName}.gifts[${giftIndex}]`
      if (!gift.content) {
        problems.push(`${giftPath}.content está pendiente.`)
      } else {
        const texts = contentText(gift)
        if (texts.length === 0 || texts.some((text) => !text.trim())) {
          problems.push(`${giftPath}.content no contiene texto completo.`)
        }
      }

      const strings = [gift.title, gift.menuLabel, ...contentText(gift)]
      for (const text of strings) {
        if (hasKnownPlaceholder(text)) {
          problems.push(`${giftPath} conserva un marcador de contenido de plantilla.`)
          break
        }
      }
    }

    for (const text of [occasion.title, occasion.welcome ?? '']) {
      if (hasKnownPlaceholder(text) || text.trim().toLocaleLowerCase('es-CL') === 'demostración') {
        problems.push(`${pathName} conserva un marcador de contenido de plantilla.`)
        break
      }
    }
  }

  for (const text of [bundle.site.recipient, bundle.site.welcome]) {
    if (hasKnownPlaceholder(text) || text.trim().toLocaleLowerCase('es-CL') === 'ti') {
      problems.push('site conserva un marcador de contenido de plantilla.')
      break
    }
  }

  if (
    [bundle.site.theme.wallpaper?.alt, bundle.site.theme.mascot?.alt]
      .filter(Boolean)
      .some(hasKnownPlaceholder) ||
    bundle.occasions.some((occasion) => occasion.gifts.some((gift) => hasKnownPlaceholder(gift.asset?.alt ?? '')))
  ) {
    problems.push('Un asset del ContentBundle conserva un marcador de contenido de plantilla.')
  }

  return problems
}

async function listFiles(directory, prefix = '') {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name)
    const absolute = path.join(directory, entry.name)
    if (entry.isSymbolicLink()) throw new Error(`No se permiten enlaces simbólicos en dist/: ${relative}`)
    if (entry.isDirectory()) files.push(...(await listFiles(absolute, relative)))
    else if (entry.isFile()) files.push({ absolute, relative })
    else throw new Error(`Tipo de archivo no admitido en dist/: ${relative}`)
  }
  return files
}

function collectAssetPaths(bundle) {
  const assets = []
  const add = (asset) => {
    if (asset?.src) assets.push(asset.src)
  }
  add(bundle.site.theme.wallpaper)
  add(bundle.site.theme.mascot)
  for (const occasion of bundle.occasions) {
    for (const gift of occasion.gifts) add(gift.asset)
  }
  return assets
}

export async function auditDist(directory, bundle) {
  const problems = []
  let files
  try {
    files = await listFiles(directory)
  } catch (error) {
    return { problems: [error.message], files: [] }
  }

  if (files.length === 0) return { problems: ['dist/ está vacío.'], files: [] }
  const names = new Set(files.map((file) => file.relative))
  if (!names.has('index.html')) problems.push('Falta dist/index.html.')
  if (!files.some(({ relative }) => /^assets\/.*\.js$/i.test(relative))) {
    problems.push('No se encontró JavaScript compilado bajo dist/assets/.')
  }

  const textFiles = []
  for (const file of files) {
    const metadata = await lstat(file.absolute)
    if (metadata.size === 0) problems.push(`${file.relative} está vacío.`)
    if (file.relative.startsWith('tests/') || /(?:^|\/)tests?\//i.test(file.relative)) {
      problems.push(`El build contiene un artefacto de pruebas: ${file.relative}.`)
    }

    if (/\.(?:html|js|css|svg|json|txt|xml)$/i.test(file.relative)) {
      const contents = await readFile(file.absolute, 'utf8')
      textFiles.push(contents)
      if (/<(?:img|script|link)\b[^>]*(?:src|href)\s*=\s*["']https?:\/\//i.test(contents)) {
        problems.push(`${file.relative} referencia un recurso HTTP externo.`)
      }
      if (/url\(\s*["']?https?:\/\//i.test(contents) || /@import\s+(?:url\()?\s*["']https?:\/\//i.test(contents)) {
        problems.push(`${file.relative} importa un recurso HTTP externo.`)
      }
    }
  }

  const builtText = textFiles.join('\n')
  for (const asset of collectAssetPaths(bundle)) {
    const relative = asset.replace(/^\//, '')
    if (!names.has(relative)) problems.push(`El asset ${asset} no está presente en dist/.`)
  }

  for (const value of collectStrings(bundle)) {
    if (value.trim().length < 8) continue
    const encoded = JSON.stringify(value)
    if (!builtText.includes(encoded) && !builtText.includes(value)) {
      problems.push(`No se encontró en dist/ un valor del bundle: "${value.slice(0, 40)}".`)
    }
  }

  return { problems, files: files.map(({ relative }) => relative).sort() }
}
