import { useEffect, useRef } from 'react'
import { GiftLayout } from '../components/GiftLayout'
import { GiftMenu } from '../components/GiftMenu'
import { RouteNotFound } from '../components/RouteNotFound'
import { formatGiftDate, site } from '../content/site'
import { getGift, giftViewRegistry, gifts } from '../gifts/registry'
import { useHashRoute } from './router'

export function App() {
  const route = useHashRoute()
  const mainRef = useRef<HTMLElement>(null)
  const previousHashRef = useRef<string | null>(null)
  const dateLabel = formatGiftDate(site.giftDate, site.locale)
  const currentGift = route.name === 'gift' ? getGift(route.id) : undefined

  useEffect(() => {
    document.title =
      route.name === 'menu'
        ? `Regalo para ${site.recipient}`
        : `${
            route.name === 'gift' ? (currentGift?.title ?? 'Ruta no encontrada') : 'Ruta no encontrada'
          } — Regalo para ${site.recipient}`
  }, [currentGift, route.name])

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
            gifts={gifts}
            recipient={site.recipient}
            giftDate={site.giftDate}
            dateLabel={dateLabel}
          />
        ) : route.name === 'gift' ? (
          <GiftRoute id={route.id} />
        ) : (
          <RouteNotFound />
        )}
      </main>
    </>
  )
}

function GiftRoute({ id }: { id: string }) {
  const gift = getGift(id)

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

