import { GiftCard } from './GiftCard'
import { collectGifts } from '../content/bundle'
import type { Occasion } from '../content/types'

interface GiftMenuProps {
  occasions: readonly Occasion[]
  recipient: string
  welcome: string
  giftDate: string | null
  dateLabel: string | null
}

export function GiftMenu({
  occasions,
  recipient,
  welcome,
  giftDate,
  dateLabel,
}: GiftMenuProps) {
  const gifts = collectGifts(occasions)

  return (
    <section aria-labelledby="menu-title">
      <header className="menu-header">
        <h1 id="menu-title">Regalo para {recipient}</h1>
        {welcome ? <p className="menu-welcome">{welcome}</p> : null}
        {dateLabel && giftDate ? (
          <p className="gift-date">
            <time dateTime={giftDate}>{dateLabel}</time>
          </p>
        ) : null}
      </header>
      <nav aria-label="Regalos">
        <ul className="gift-grid" role="list">
          {gifts.map((gift) => (
            <li key={gift.id}>
              <GiftCard gift={gift} />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
