import { Fragment } from 'react'
import type { GiftViewProps } from '../types'
import { PendingGiftView } from './PendingGiftView'

export function PoemView({ gift }: GiftViewProps) {
  if (gift.kind !== 'poem') {
    return <PendingGiftView gift={gift} />
  }

  const content = gift.content

  if (!content || content.stanzas.length === 0) {
    return (
      <p className="pending" data-content-status="pending">
        El poema todavía no tiene un texto aprobado. La estructura de versos y estrofas está lista,
        pero no se muestra contenido inventado.
      </p>
    )
  }

  return (
    <div className="poem">
      {content.stanzas.map((stanza, stanzaIndex) => (
        <p className="poem__stanza" key={stanzaIndex}>
          {stanza.map((verse, verseIndex) => (
            <Fragment key={verseIndex}>
              {verseIndex > 0 ? <br /> : null}
              {verse}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}
