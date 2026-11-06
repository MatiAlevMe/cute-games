import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import { auditDist, validateBundleForMode } from './release-policy.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const modeArgument = process.argv.indexOf('--mode')
const mode = modeArgument === -1 ? 'public' : process.argv[modeArgument + 1]
const problems = []

if (!mode || mode.startsWith('--')) {
  console.error('✗ Indica el modo con --mode public o --mode personal.')
  process.exit(1)
}

let server
try {
  server = await createServer({
    configFile: path.join(root, 'vite.config.ts'),
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  const [{ demoBundle }, { validateContentBundle }, { giftKinds }] = await Promise.all([
    server.ssrLoadModule('/src/content/demo.ts'),
    server.ssrLoadModule('/src/content/validate.ts'),
    server.ssrLoadModule('/src/gifts/registry.ts'),
  ])

  const bundleResult = validateContentBundle(demoBundle, { knownKinds: giftKinds })
  problems.push(...bundleResult.problems.map((problem) => `ContentBundle: ${problem}`))
  problems.push(...validateBundleForMode(demoBundle, mode))

  const audit = await auditDist(path.join(root, 'dist'), demoBundle)
  problems.push(...audit.problems.map((problem) => `dist/: ${problem}`))

  if (problems.length > 0) {
    console.error(`✗ Validación de release (${mode}) fallida:`)
    for (const problem of problems) console.error(`  - ${problem}`)
    console.error('\nNo se ha publicado ni modificado ningún archivo.')
    process.exitCode = 1
  } else {
    console.log(`✓ Release ${mode}: ContentBundle válido y dist/ auditado (${audit.files.length} archivos).`)
    if (mode === 'personal') {
      console.log('  Revisa dist/ localmente; este resultado no autoriza a publicar contenido personal.')
    } else {
      console.log('  La huella coincide con la demo neutra revisada.')
    }
  }
} catch (error) {
  console.error(`✗ No se pudo validar el release: ${error.message}`)
  process.exitCode = 1
} finally {
  await server?.close()
}
