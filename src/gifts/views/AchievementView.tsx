import type { GiftViewProps } from '../types'
import { PendingGiftView } from './PendingGiftView'

export function AchievementView({ gift }: GiftViewProps) {
  if (gift.kind !== 'achievement') {
    return <PendingGiftView gift={gift} />
  }

  const content = gift.content

  if (!content || !content.message) {
    return (
      <p className="pending" data-content-status="pending">
        La felicitación todavía no tiene un mensaje aprobado. La estructura de la vista está lista,
        pero no se muestra contenido inventado.
      </p>
    )
  }

  return (
    <div className="achievement">
      {gift.asset ? (
        <img
          className="achievement__asset"
          src={gift.asset.src}
          alt={gift.asset.decorative ? '' : gift.asset.alt}
        />
      ) : null}
      <p className="achievement__message">{content.message}</p>
    </div>
  )
}
