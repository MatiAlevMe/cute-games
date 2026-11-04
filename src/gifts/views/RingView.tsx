import type { GiftViewProps } from '../types'
import { PendingGiftView } from './PendingGiftView'

export function RingView({ gift }: GiftViewProps) {
  if (gift.kind !== 'ring') {
    return <PendingGiftView gift={gift} />
  }

  const content = gift.content

  if (!content || !content.message) {
    return (
      <p className="pending" data-content-status="pending">
        El anillo todavía no tiene un mensaje aprobado. La estructura de la vista está lista, pero
        no se muestra contenido inventado.
      </p>
    )
  }

  return (
    <div className="ring">
      {gift.asset ? (
        <img
          className="ring__asset"
          src={gift.asset.src}
          alt={gift.asset.decorative ? '' : gift.asset.alt}
        />
      ) : null}
      <p className="ring__message">{content.message}</p>
    </div>
  )
}
