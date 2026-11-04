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
]

const routes = ['/', ...gifts.map((gift) => gift.path)]

test('el menú muestra los cuatro regalos', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Regalo para ti/)
  await expect(page.getByRole('heading', { level: 1, name: 'Regalo para ti' })).toBeVisible()

  const nav = page.getByRole('navigation', { name: 'Regalos' })
  await expect(nav.getByRole('link')).toHaveCount(4)
  await expect(nav.getByRole('link', { name: 'Carta' })).toHaveAttribute(
    'href',
    '#/regalo/carta',
  )
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

  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#\/regalo\/carta$/)
  await expect(page.locator('main')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /Volver al menú/ })).toBeFocused()
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
