import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const problems = []

async function read(relativePath) {
  return readFile(new URL(relativePath, new URL('../', import.meta.url)), 'utf8')
}

const site = await read('src/content/site.ts')
const dateMatch = /giftDate:\s*(null|'([^']*)')/.exec(site)

if (!dateMatch) {
  problems.push('No se pudo leer giftDate en src/content/site.ts.')
} else if (dateMatch[1] === 'null') {
  problems.push('giftDate sigue en null: configura la fecha real del regalo.')
} else {
  const date = dateMatch[2]
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

  if (!parts) {
    problems.push(`giftDate "${date}" no usa el formato YYYY-MM-DD.`)
  } else {
    const parsed = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))

    if (
      parsed.getFullYear() !== Number(parts[1]) ||
      parsed.getMonth() !== Number(parts[2]) - 1 ||
      parsed.getDate() !== Number(parts[3])
    ) {
      problems.push(`giftDate "${date}" no es una fecha calendario válida.`)
    }
  }
}

const textFiles = ['carta.txt', 'poema.txt', 'anillo.txt', 'logro.txt']

for (const file of textFiles) {
  const content = await read(`src/content/texts/${file}`)

  if (content.trim().length === 0) {
    problems.push(`src/content/texts/${file} está vacío.`)
  } else if (/predeterminad/i.test(content)) {
    problems.push(`src/content/texts/${file} todavía contiene el texto predeterminado.`)
  }
}

const registry = await read('src/gifts/registry.ts')

if (/content:\s*null/.test(registry)) {
  problems.push('src/gifts/registry.ts todavía tiene un regalo con contenido pendiente.')
}

if (problems.length > 0) {
  console.error('✗ Validación de release fallida:')
  for (const problem of problems) {
    console.error(`  - ${problem}`)
  }
  console.error(`\nDirectorio revisado: ${root}`)
  process.exit(1)
}

console.log('✓ Validación de release OK: fecha, textos y contenido listos.')
