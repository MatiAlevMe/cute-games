import { useEffect, useState } from 'react'
import type { GiftViewProps } from '../types'
import { PendingGiftView } from './PendingGiftView'

interface MemoryCard {
  id: number
  pair: string
}

function turnLabel(count: number): string {
  return `${count} ${count === 1 ? 'turno' : 'turnos'}`
}

function shufflePairs(pairs: readonly string[]): MemoryCard[] {
  const cards = pairs.flatMap((pair) => [pair, pair]).map((pair, id) => ({ id, pair }))

  for (let index = cards.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(Math.random() * (index + 1))
    ;[cards[index], cards[otherIndex]] = [cards[otherIndex], cards[index]]
  }

  return cards
}

export function MiniGameView({ gift }: GiftViewProps) {
  if (gift.kind !== 'robot-memory' || !gift.content || gift.content.pairs.length < 2) {
    return <PendingGiftView gift={gift} />
  }

  return <MemoryGame key={gift.id} pairs={gift.content.pairs} />
}

function MemoryGame({ pairs }: { pairs: readonly string[] }) {
  const [cards, setCards] = useState(() => shufflePairs(pairs))
  const [revealed, setRevealed] = useState<number[]>([])
  const [matched, setMatched] = useState<ReadonlySet<number>>(() => new Set())
  const [moves, setMoves] = useState(0)
  const [announcement, setAnnouncement] = useState(`Juego listo: ${pairs.length} parejas.`)

  useEffect(() => {
    const first = cards.find((card) => card.id === revealed[0])
    const second = cards.find((card) => card.id === revealed[1])

    if (revealed.length !== 2 || !first || !second || first.pair === second.pair) {
      return
    }

    const timeout = window.setTimeout(() => {
      setRevealed([])
      setAnnouncement('No coinciden. Las cartas se ocultaron; sigue buscando.')
    }, 900)

    return () => window.clearTimeout(timeout)
  }, [cards, revealed])

  function turnCard(card: MemoryCard) {
    if (revealed.length === 2 || matched.has(card.id) || revealed.includes(card.id)) {
      return
    }

    const nextRevealed = [...revealed, card.id]
    setRevealed(nextRevealed)

    if (nextRevealed.length === 1) {
      setAnnouncement(`Carta ${card.pair} descubierta. Elige otra carta.`)
      return
    }

    const first = cards.find((item) => item.id === nextRevealed[0])
    if (!first) return

    const nextMoves = moves + 1
    setMoves(nextMoves)

    if (first.pair === card.pair) {
      const nextMatched = new Set(matched).add(first.id).add(card.id)
      const foundPairs = nextMatched.size / 2
      setMatched(nextMatched)
      setRevealed([])
      setAnnouncement(
        foundPairs === pairs.length
          ? `Juego completado en ${turnLabel(nextMoves)}.`
          : `Pareja ${card.pair} encontrada. ${foundPairs} de ${pairs.length} parejas; ${turnLabel(nextMoves)}.`,
      )
    } else {
      setAnnouncement(`No coinciden. ${turnLabel(nextMoves)}.`)
    }
  }

  function restart() {
    setCards(shufflePairs(pairs))
    setRevealed([])
    setMatched(new Set())
    setMoves(0)
    setAnnouncement(`Juego reiniciado: ${pairs.length} parejas.`)
  }

  return (
    <section className="robot-memory" aria-label="Memoria del robot">
      <div className="robot-memory__toolbar">
        <p className="robot-memory__moves">Turnos: {moves}</p>
        <button className="robot-memory__restart" type="button" onClick={restart}>
          Reiniciar juego
        </button>
      </div>
      <div
        className="robot-memory__grid"
        role="group"
        aria-label={`Tablero de memoria, ${pairs.length * 2} cartas`}
      >
        {cards.map((card, index) => {
          const isRevealed = revealed.includes(card.id)
          const isMatched = matched.has(card.id)
          const isShown = isRevealed || isMatched

          return (
            <button
              className={`robot-memory__card${isShown ? ' is-revealed' : ''}${isMatched ? ' is-matched' : ''}`}
              type="button"
              key={card.id}
              aria-label={isShown ? `Carta ${index + 1}: ${card.pair}` : `Carta ${index + 1}, oculta`}
              aria-pressed={isShown}
              disabled={isMatched}
              onClick={() => turnCard(card)}
            >
              <span aria-hidden="true">{isShown ? card.pair : '?'}</span>
            </button>
          )
        })}
      </div>
      <p className="robot-memory__status" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  )
}
