import { achievementContent, letterContent, poemContent, ringContent } from './texts'
import { demoSite } from './site'
import type { ContentBundle } from './types'

/**
 * Bundle de la demo pública. La fecha, la bienvenida y los textos son de
 * ejemplo: el contenido real vive en un repositorio privado.
 */
export const demoBundle: ContentBundle = {
  site: demoSite,
  occasions: [
    {
      id: 'demo',
      date: '2026-01-01',
      title: 'Demostración',
      welcome: 'Explora los cuatro regalos de ejemplo.',
      gifts: [
        {
          id: 'carta',
          kind: 'letter',
          title: 'Carta',
          menuLabel: 'Carta',
          content: letterContent,
        },
        {
          id: 'poema',
          kind: 'poem',
          title: 'Poema',
          menuLabel: 'Poema',
          content: poemContent,
        },
        {
          id: 'anillo',
          kind: 'ring',
          title: 'Anillo',
          menuLabel: 'Anillo',
          content: ringContent,
        },
        {
          id: 'logro',
          kind: 'achievement',
          title: 'Logro',
          menuLabel: 'Logro',
          content: achievementContent,
        },
      ],
    },
  ],
}
