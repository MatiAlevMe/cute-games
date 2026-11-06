import { expect, test } from '@playwright/test'

const gifts = [
  {
    path: '/#/regalo/carta',
    title: 'Carta',
    selector: '.letter__paragraph',
    count: 3,
  },
  {
    path: '/#/regalo/poema',
    title: 'Poema',
    selector: '.poem__stanza',
    count: 3,
  },
  {
    path: '/#/regalo/anillo',
    title: 'Anillo',
    selector: '.ring__message',
    count: 1,
  },
  {
    path: '/#/regalo/logro',
    title: 'Logro',
    selector: '.achievement__message',
    count: 1,
  },
  {
    path: '/#/regalo/memoria-robot',
    title: 'Memoria del robot',
    selector: '.robot-memory__card',
    count: 8,
  },
]

const routes = ['/', ...gifts.map((gift) => gift.path)]

test('el menú muestra los cinco regalos', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Regalo para ti/)
  await expect(page.getByRole('heading', { level: 1, name: 'Regalo para ti' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Demostración' })).toBeVisible()
  await expect(page.getByText('Explora los regalos de ejemplo.')).toBeVisible()
  await expect(page.locator('time')).toHaveAttribute('dateTime', '2026-01-01')

  const nav = page.getByRole('navigation', { name: 'Regalos' })
  await expect(nav.getByRole('link')).toHaveCount(5)
  await expect(nav.locator('ol.occasion-timeline > li')).toHaveCount(1)
  await expect(nav.locator('ul.gift-grid > li')).toHaveCount(5)
  await expect(nav.getByRole('link', { name: 'Carta' })).toHaveAttribute(
    'href',
    '#/regalo/carta',
  )
})

test('el tema celeste usa arte local y cambia al fallback original si falta un asset', async ({ page }) => {
  await page.route('**/assets/theme/celeste-wallpaper.svg', (route) => route.abort())
  await page.goto('/')

  await expect(page.locator('.app-shell')).toHaveClass(/theme-celeste/)
  await expect(page.locator('.theme-art__wallpaper')).toHaveAttribute(
    'src',
    '/assets/theme/fallback-wallpaper.svg',
  )
  await expect(page.locator('.theme-art__mascot')).toHaveAttribute(
    'src',
    '/assets/theme/fallback-robot.svg',
  )
  await expect(page.locator('.theme-art__wallpaper')).toHaveAttribute('alt', '')
  await expect
    .poll(() =>
      page.locator('.theme-art img').evaluateAll((images) =>
        images.every(
          (image) =>
            (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
        ),
      ),
    )
    .toBe(true)

  const theme = await page.locator('.app-shell').evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      background: style.getPropertyValue('--color-background').trim(),
      text: style.getPropertyValue('--color-text').trim(),
    }
  })
  expect(theme).toEqual({ background: '#eaf7ff', text: '#163247' })
})

for (const gift of gifts) {
  test(`abre ${gift.title} y vuelve al menú`, async ({ page }) => {
    await page.goto(gift.path)

    await expect(page.getByRole('heading', { level: 1, name: gift.title })).toBeVisible()
    await expect(page.locator(gift.selector)).toHaveCount(gift.count)
    await expect(page.locator('[data-content-status="pending"]')).toHaveCount(0)

    await page.getByRole('link', { name: /Volver al menú/ }).click()
    await expect(page).toHaveURL(/#\/$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Regalo para ti' })).toBeVisible()
  })
}

test('una ruta desconocida se recupera', async ({ page }) => {
  await page.goto('/#/regalo/no-existe')

  await expect(page.getByRole('heading', { level: 1, name: 'Ruta no encontrada' })).toBeVisible()
  await page.getByRole('link', { name: /Volver al menú/ }).click()

  await expect(page.getByRole('heading', { level: 1, name: 'Regalo para ti' })).toBeVisible()
})

test('el botón atrás del navegador regresa al menú', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Regalos' }).getByRole('link', { name: 'Carta' }).click()

  await expect(page.getByRole('heading', { level: 1, name: 'Carta' })).toBeVisible()
  await page.goBack()

  await expect(page.getByRole('heading', { level: 1, name: 'Regalo para ti' })).toBeVisible()
})

test('se puede navegar y volver con el teclado', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused()

  await page.keyboard.press('Tab')
  const card = page.getByRole('navigation', { name: 'Regalos' }).getByRole('link', { name: 'Carta' })
  await expect(card).toBeFocused()
  await expect(card).toHaveCSS('outline-style', 'solid')
  await expect(card).toHaveCSS('outline-width', '3px')

  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#\/regalo\/carta$/)
  await expect(page.locator('main')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /Volver al menú/ })).toBeFocused()
})

test('memoria funciona con teclado, anuncia estados y permite reiniciar', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.999999
  })
  await page.goto('/#/regalo/memoria-robot')
  const cards = page.locator('.robot-memory__card')
  const firstCard = cards.first()

  await firstCard.focus()
  await expect(firstCard).toBeFocused()
  await expect(firstCard).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(firstCard).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('status')).toContainText('descubierta')

  await cards.nth(2).click()
  await expect(page.getByText('Turnos: 1')).toBeVisible()
  await expect(page.getByRole('status')).toContainText('No coinciden')
  await expect(firstCard).toHaveAttribute('aria-pressed', 'false', { timeout: 2_000 })

  await firstCard.focus()
  await page.keyboard.press('Enter')
  await cards.nth(1).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toContainText('Pareja 1 encontrada')

  for (const index of [2, 4, 6]) {
    await cards.nth(index).click()
    await cards.nth(index + 1).click()
  }
  await expect(page.getByRole('status')).toHaveText('Juego completado en 5 turnos.')

  await page.getByRole('button', { name: 'Reiniciar juego' }).click()
  await expect(page.getByText('Turnos: 0')).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('Juego reiniciado: 4 parejas.')
  await expect(cards).toHaveCount(8)
  await expect
    .poll(() => cards.evaluateAll((items) => items.every((item) => item.getAttribute('aria-pressed') === 'false')))
    .toBe(true)
})

test('la memoria admite interacción táctil y respeta movimiento reducido', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/regalo/memoria-robot')

  const card = page.locator('.robot-memory__card').first()
  const box = await card.boundingBox()
  expect(box).not.toBeNull()
  await page.touchscreen.tap(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await expect(card).toHaveAttribute('aria-pressed', 'true')
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
  await context.close()
})

test('respeta prefers-reduced-motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(
    true,
  )
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
})

test('no hay scroll horizontal en los anchos de referencia', async ({ page }) => {
  for (const width of [320, 375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 })

    for (const route of routes) {
      await page.goto(route)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      )

      expect(overflow, `${route} a ${width}px`).toBe(false)
    }
  }
})
