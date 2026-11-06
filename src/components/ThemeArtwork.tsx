import { useState } from 'react'
import type { ThemeAsset } from '../content/types'

const fallbackWallpaper: ThemeAsset = {
  src: '/assets/theme/fallback-wallpaper.svg',
  alt: 'Cielo ilustrado con nubes, estrellas y una cuadrícula pixelada.',
  decorative: true,
}

const fallbackMascot: ThemeAsset = {
  src: '/assets/theme/fallback-robot.svg',
  alt: 'Robot original celeste con antena y ojos luminosos.',
  decorative: true,
}

interface ThemeArtworkProps {
  wallpaper?: ThemeAsset
  mascot?: ThemeAsset
}

export function ThemeArtwork({ wallpaper, mascot }: ThemeArtworkProps) {
  return (
    <div className="theme-art">
      <FallbackImage
        key={wallpaper?.src ?? fallbackWallpaper.src}
        className="theme-art__wallpaper"
        asset={wallpaper}
        fallback={fallbackWallpaper}
      />
      <FallbackImage
        key={mascot?.src ?? fallbackMascot.src}
        className="theme-art__mascot"
        asset={mascot}
        fallback={fallbackMascot}
      />
    </div>
  )
}

function FallbackImage({
  className,
  asset,
  fallback,
}: {
  className: string
  asset?: ThemeAsset
  fallback: ThemeAsset
}) {
  const [source, setSource] = useState(asset?.src ?? fallback.src)
  const isFallback = source === fallback.src
  const [unavailable, setUnavailable] = useState(false)

  if (unavailable) {
    return null
  }

  const description = isFallback ? fallback : (asset ?? fallback)

  return (
    <img
      className={className}
      src={source}
      alt={description.decorative ? '' : description.alt}
      aria-hidden={description.decorative ? true : undefined}
      onError={() => {
        if (!isFallback) {
          setSource(fallback.src)
        } else {
          setUnavailable(true)
        }
      }}
    />
  )
}
