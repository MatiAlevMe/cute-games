import { useEffect, useRef } from 'react'
import { GiftLayout } from '../components/GiftLayout'
import { GiftMenu } from '../components/GiftMenu'
import { RouteNotFound } from '../components/RouteNotFound'
import { findGift, sortOccasions } from '../content/bundle'
import type { ContentBundle } from '../content/types'
import { assertValidContentBundle } from '../content/validate'
import { giftKinds, giftViewRegistry } from '../gifts/registry'
import { useHashRoute } from './router'

interface AppProps {
  bundle: ContentBundle
}

export function App({ bundle }: AppProps) {
  assertValidContentBundle(bundle, { knownKinds: giftKinds })

  const route = useHashRoute()
  const mainRef = useRef<HTMLElement>(null)
  const previousHashRef = useRef<string | null>(null)
  const occasions = sortOccasions(bundle.occasions)
  const currentGift = route.name === 'gift' ? findGift(bundle, route.id) : undefined

  useEffect(() => {
    document.title =
      route.name === 'menu'
        ? `Regalo para ${bundle.site.recipient}`
        : `${
            route.name === 'gift' ? (currentGift?.title ?? 'Ruta no encontrada') : 'Ruta no encontrada'
          } — Regalo para ${bundle.site.recipient}`
  }, [bundle.site.recipient, currentGift, route.name])

  /**
   * Al cambiar de ruta, mueve el foco al contenido principal para que la nueva
   * vista se anuncie y el recorrido por teclado empiece arriba. La primera carga
   * no roba el foco.
   */
  useEffect(() => {
    const currentHash = window.location.hash

    if (previousHashRef.current === null) {
      previousHashRef.current = currentHash
      return
    }

    if (previousHashRef.current === currentHash) {
      return
    }

    previousHashRef.current = currentHash
    mainRef.current?.focus()
  }, [route])

  return (
    <>
      <a
        className="skip-link"
        href="#contenido"
        onClick={(event) => {
          event.preventDefault()
          mainRef.current?.focus()
        }}
      >
        Saltar al contenido
      </a>
      <main id="contenido" className="page" tabIndex={-1} ref={mainRef}>
        {route.name === 'menu' ? (
          <GiftMenu
            occasions={occasions}
            recipient={bundle.site.recipient}
            siteWelcome={bundle.site.welcome}
            locale={bundle.site.locale}
          />
        ) : route.name === 'gift' ? (
          <GiftRoute bundle={bundle} id={route.id} />
        ) : (
          <RouteNotFound />
        )}
      </main>
    </>
  )
}

function GiftRoute({ bundle, id }: { bundle: ContentBundle; id: string }) {
  const gift = findGift(bundle, id)

  if (!gift) {
    return <RouteNotFound />
  }

  const View = giftViewRegistry[gift.kind]

  return (
    <GiftLayout gift={gift}>
      <View gift={gift} />
    </GiftLayout>
  )
}
