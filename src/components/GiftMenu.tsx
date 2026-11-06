import { resolveWelcome, sortGifts, sortOccasions } from '../content/bundle'
import { formatGiftDate } from '../content/date'
import type { Occasion } from '../content/types'
import { GiftCard } from './GiftCard'

interface GiftMenuProps {
  occasions: readonly Occasion[]
  recipient: string
  siteWelcome: string
  locale: string
}

export function GiftMenu({ occasions, recipient, siteWelcome, locale }: GiftMenuProps) {
  const orderedOccasions = sortOccasions(occasions)

  return (
    <section aria-labelledby="menu-title">
      <header className="menu-header">
        <h1 id="menu-title">Regalo para {recipient}</h1>
        {orderedOccasions.length === 0 ? <p className="menu-welcome">{siteWelcome}</p> : null}
      </header>
      <nav aria-label="Regalos">
        <ol className="occasion-timeline">
          {orderedOccasions.map((occasion) => {
            const headingId = `occasion-${occasion.id}`
            const welcome = resolveWelcome(siteWelcome, occasion)
            const dateLabel = formatGiftDate(occasion.date, locale)

            return (
              <li key={occasion.id}>
                <section className="occasion-section" aria-labelledby={headingId}>
                  <header className="occasion-header">
                    <h2 id={headingId}>{occasion.title}</h2>
                    <p className="gift-date">
                      <time dateTime={occasion.date}>{dateLabel}</time>
                    </p>
                    {welcome ? <p className="occasion-welcome">{welcome}</p> : null}
                  </header>
                  <ul className="gift-grid" role="list">
                    {sortGifts(occasion.gifts).map((gift) => (
                      <li key={gift.id}>
                        <GiftCard gift={gift} />
                      </li>
                    ))}
                  </ul>
                </section>
              </li>
            )
          })}
        </ol>
      </nav>
    </section>
  )
}
