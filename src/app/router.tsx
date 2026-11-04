import { useEffect, useState } from 'react'

export type Route =
  | { name: 'menu' }
  | { name: 'gift'; id: string }
  | { name: 'not-found' }

export const menuHref = '#/'

export function giftHref(id: string): string {
  return `#/regalo/${encodeURIComponent(id)}`
}

export function parseRoute(hash: string): Route {
  if (hash === '' || hash === '#' || hash === '#/') {
    return { name: 'menu' }
  }

  const match = /^#\/regalo\/([^/?#]+)\/?$/.exec(hash)

  if (!match) {
    return { name: 'not-found' }
  }

  try {
    const id = decodeURIComponent(match[1])

    return id ? { name: 'gift', id } : { name: 'not-found' }
  } catch {
    return { name: 'not-found' }
  }
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute(window.location.hash))

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}
