import type { ContentBundle, Occasion } from '../../src/content/types'
import type { GiftDefinition } from '../../src/gifts/types'

type LetterGift = Extract<GiftDefinition, { kind: 'letter' }>
type PoemGift = Extract<GiftDefinition, { kind: 'poem' }>
type RingGift = Extract<GiftDefinition, { kind: 'ring' }>
type AchievementGift = Extract<GiftDefinition, { kind: 'achievement' }>

export const letterGift: LetterGift = {
  id: 'carta',
  kind: 'letter',
  title: 'Carta',
  menuLabel: 'Carta',
  content: {
    paragraphs: ['Primer párrafo.', 'Segundo párrafo\ncon un salto interno.'],
  },
}

export const poemGift: PoemGift = {
  id: 'poema',
  kind: 'poem',
  title: 'Poema',
  menuLabel: 'Poema',
  content: {
    stanzas: [
      ['Primer verso.', 'Segundo verso.'],
      ['Tercer verso.', 'Cuarto verso.', 'Quinto verso.'],
    ],
  },
}

export const ringGift: RingGift = {
  id: 'anillo',
  kind: 'ring',
  title: 'Anillo',
  menuLabel: 'Anillo',
  content: { message: 'Mensaje de prueba.' },
}

export const achievementGift: AchievementGift = {
  id: 'logro',
  kind: 'achievement',
  title: 'Logro',
  menuLabel: 'Logro',
  content: { message: 'Felicitación de prueba.' },
}

export const demoOccasion: Occasion = {
  id: 'demo',
  date: '2026-01-01',
  title: 'Demostración',
  gifts: [letterGift, poemGift, ringGift, achievementGift],
}

export function makeBundle(overrides: Partial<ContentBundle> = {}): ContentBundle {
  return {
    site: {
      recipient: 'ti',
      welcome: 'Bienvenida del sitio.',
      locale: 'es-CL',
      theme: { id: 'celeste' },
    },
    occasions: [demoOccasion],
    ...overrides,
  }
}
