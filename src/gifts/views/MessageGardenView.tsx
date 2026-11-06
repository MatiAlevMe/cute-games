import { useState } from 'react'
import type { GiftViewProps } from '../types'
import { PendingGiftView } from './PendingGiftView'

export function MessageGardenView({ gift }: GiftViewProps) {
  if (gift.kind !== 'message-garden' || !gift.content || gift.content.messages.length === 0) {
    return <PendingGiftView gift={gift} />
  }

  return <MessageGarden key={gift.id} messages={gift.content.messages} />
}

function messageCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'mensaje' : 'mensajes'}`
}

function MessageGarden({ messages }: { messages: readonly string[] }) {
  const [revealed, setRevealed] = useState<ReadonlySet<number>>(() => new Set())
  const [announcement, setAnnouncement] = useState(
    `Jardín listo: ${messageCountLabel(messages.length)}.`,
  )

  function reveal(index: number) {
    if (revealed.has(index)) return

    const nextRevealed = new Set(revealed).add(index)
    setRevealed(nextRevealed)
    setAnnouncement(`Mensaje ${index + 1} de ${messages.length}: ${messages[index]}`)
  }

  function restart() {
    setRevealed(new Set())
    setAnnouncement(`Jardín reiniciado: 0 de ${messages.length} mensajes revelados.`)
  }

  return (
    <section className="message-garden" aria-label="Jardín de mensajes">
      <div className="message-garden__toolbar">
        <p className="message-garden__progress">
          Mensajes revelados: {revealed.size} de {messages.length}
        </p>
        <button className="message-garden__restart" type="button" onClick={restart}>
          Reiniciar jardín
        </button>
      </div>
      <div
        className="message-garden__flowers"
        role="group"
        aria-label={`${messages.length} flores con mensajes`}
      >
        {messages.map((message, index) => {
          const isRevealed = revealed.has(index)
          const messageId = `garden-message-${index + 1}`

          return (
            <article className="message-garden__flower" key={index}>
              <button
                className="message-garden__button"
                type="button"
                aria-controls={messageId}
                aria-expanded={isRevealed}
                aria-label={
                  isRevealed ? `Flor ${index + 1}, mensaje revelado` : `Revelar flor ${index + 1}`
                }
                onClick={() => reveal(index)}
              >
                <span className="message-garden__icon" aria-hidden="true">
                  {isRevealed ? '🌼' : '🌱'}
                </span>
                <span>Flor {index + 1}</span>
              </button>
              <p className="message-garden__message" id={messageId} hidden={!isRevealed}>
                {message}
              </p>
            </article>
          )
        })}
      </div>
      <p className="message-garden__status" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  )
}
