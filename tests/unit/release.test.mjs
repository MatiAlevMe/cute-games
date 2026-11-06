import { afterEach, describe, expect, it } from 'vitest'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { demoBundle } from '../../src/content/demo.ts'
import { auditDist, validateBundleForMode } from '../../scripts/release-policy.mjs'

const temporaryDirectories = []

async function makeTempDirectory() {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cute-games-release-'))
  temporaryDirectories.push(directory)
  return directory
}

function personalBundle() {
  const bundle = structuredClone(demoBundle)
  bundle.site = { ...bundle.site, recipient: 'persona', welcome: 'Bienvenida especial.' }
  bundle.occasions = bundle.occasions.map((occasion) => ({
    ...occasion,
    id: 'celebracion',
    title: 'Celebración',
    welcome: 'Un día especial.',
    gifts: occasion.gifts.map((gift) => {
      const content = {
        letter: { paragraphs: ['Texto propio.'] },
        poem: { stanzas: [['Verso propio.']] },
        ring: { message: 'Mensaje especial.' },
        achievement: { message: 'Felicitación especial.' },
        'robot-memory': { pairs: ['A', 'B'] },
        'message-garden': { messages: ['Mensaje del jardín.'] },
      }[gift.kind]
      return { ...gift, content }
    }),
  }))
  return bundle
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true })))
})

describe('validación de release', () => {
  it('acepta solo la huella revisada en modo público', () => {
    expect(validateBundleForMode(demoBundle, 'public')).toEqual([])
    const altered = structuredClone(demoBundle)
    altered.site.welcome = 'Contenido distinto.'
    expect(validateBundleForMode(altered, 'public')).toContain(
      'La demo pública difiere de la demo neutra revisada; audita el contenido y actualiza la huella solo si procede.',
    )
  })

  it('permite contenido completo en modo personal y bloquea la demo incompleta', () => {
    expect(validateBundleForMode(personalBundle(), 'personal')).toEqual([])
    expect(validateBundleForMode(demoBundle, 'personal').join('\n')).toMatch(/está pendiente/)
  })

  it('bloquea los marcadores de contenido de plantilla conocidos', () => {
    const bundle = personalBundle()
    bundle.occasions[0].gifts[0].content.paragraphs = ['Esta es una carta de ejemplo.']
    expect(validateBundleForMode(bundle, 'personal').join('\n')).toMatch(/marcador de contenido/)
  })

  it('no acepta secciones de texto vacías en una instancia personal', () => {
    const bundle = personalBundle()
    bundle.occasions[0].gifts[0].content.paragraphs = []
    expect(validateBundleForMode(bundle, 'personal').join('\n')).toMatch(/no contiene texto completo/)
  })

  it('audita los archivos, assets y contenido compilado de dist/', async () => {
    const directory = await makeTempDirectory()
    await mkdir(path.join(directory, 'assets', 'theme'), { recursive: true })
    await writeFile(path.join(directory, 'index.html'), '<!doctype html><script src="/assets/app.js"></script>')
    await writeFile(path.join(directory, 'assets', 'app.js'), JSON.stringify(demoBundle))
    await writeFile(path.join(directory, 'assets', 'theme', 'celeste-wallpaper.svg'), '<svg/>')

    expect(await auditDist(directory, demoBundle)).toEqual({
      problems: [],
      files: ['assets/app.js', 'assets/theme/celeste-wallpaper.svg', 'index.html'],
    })
  })

  it('falla si falta contenido del bundle en el build', async () => {
    const directory = await makeTempDirectory()
    await mkdir(path.join(directory, 'assets'), { recursive: true })
    await writeFile(path.join(directory, 'index.html'), '<!doctype html>')
    await writeFile(path.join(directory, 'assets', 'app.js'), 'bundle sin textos')
    await writeFile(path.join(directory, 'assets', 'theme.svg'), '<svg/>')

    const audit = await auditDist(directory, demoBundle)
    expect(audit.problems.some((problem) => problem.includes('No se encontró en dist/'))).toBe(true)
  })
})
