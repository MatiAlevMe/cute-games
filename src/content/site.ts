import type { SiteConfig } from './types'

/**
 * Configuración neutra de la demo. Reemplázala por el contenido de tu
 * repositorio privado. La fecha vive en cada `Occasion`, no en el sitio.
 */
export const demoSite: SiteConfig = {
  recipient: 'ti',
  welcome: 'Esta es una demostración de la plantilla cute-games.',
  locale: 'es-CL',
  theme: {
    id: 'celeste',
    wallpaper: {
      src: '/assets/theme/celeste-wallpaper.svg',
      alt: 'Cielo celeste con nubes, estrellas y una cuadrícula pixelada.',
      decorative: true,
    },
  },
}
