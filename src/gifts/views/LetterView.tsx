import type { GiftViewProps } from '../types'
import { PendingGiftView } from './PendingGiftView'

export function LetterView({ gift }: GiftViewProps) {
  if (gift.kind !== 'letter') {
    return <PendingGiftView gift={gift} />
  }

  const content = gift.content

  if (!content || content.paragraphs.length === 0) {
    return (
      <p className="pending" data-content-status="pending">
        La carta todavía no tiene un texto aprobado. La estructura de lectura está lista, pero no
        se muestra contenido inventado.
      </p>
    )
  }

  return (
    <div className="letter">
      {content.paragraphs.map((paragraph, index) => (
        <p className="letter__paragraph" key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}
