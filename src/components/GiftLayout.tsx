import type { ReactNode } from 'react'
import { menuHref } from '../app/router'
import type { GiftDefinition } from '../gifts/types'

interface GiftLayoutProps {
  gift: GiftDefinition
  children: ReactNode
}

export function GiftLayout({ gift, children }: GiftLayoutProps) {
  return (
    <article aria-labelledby="gift-title">
      <a className="back-link" href={menuHref}>
        <span aria-hidden="true">←</span> Volver al menú
      </a>
      <h1 id="gift-title">{gift.title}</h1>
      {children}
    </article>
  )
}
