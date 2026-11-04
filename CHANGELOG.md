# CHANGELOG

## 2026-11-04

- Se publica la plantilla pública `cute-games` con historial nuevo. El árbol contiene solo la demo
  neutra: sin nombres, fechas, textos ni assets personales.
- Se separa la documentación pública de la privada: el contenido real de un regalo vive en un
  repositorio privado derivado de esta plantilla.
- Se actualiza la licencia a **MIT** para el código propio, con alcance y procedencia de assets
  documentados en `docs/work/regalo-publico/`.
- Se añade `docs/work/regalo-publico/PRIVACY.md` con la política de contenido público y privado.
- Se añade `docs/work/regalo-publico/REPOS.md` con el flujo para usar la plantilla en un repo
  privado.

## 2026-10-30

- Se implementa F1-T10: Playwright 1.64.1 con 10 pruebas E2E para menú, cuatro vistas, retorno,
  ruta inválida, atrás, teclado, movimiento reducido y anchos de 320/375/768/1024 px. Se añaden
  `playwright.config.ts`, `tests/e2e/navigation.e2e.ts` y el script `test:e2e`.
- Se añade `scripts/validate-release.mjs` y los scripts `validate:release` y `build:release`. La
  validación falla a propósito mientras `giftDate` sea `null` o los textos sean de ejemplo.
- Se implementa F1-T09: tokens mínimos de color y espaciado, foco visible, objetivos táctiles,
  semántica de lista en el menú, foco al contenido al cambiar de ruta, título de documento por ruta
  y reglas de `prefers-reduced-motion`. Verificado con teclado, contraste y viewports en Chrome
  headless; Safari/VoiceOver siguen pendientes.
- Se implementa F1-T08: `AchievementView` muestra la felicitación configurada, soporta un asset
  opcional con texto alternativo y presenta un estado pendiente si falta el mensaje.
- Se implementa F1-T07: `RingView` muestra el mensaje del anillo, soporta un asset opcional con
  texto alternativo (o decorativo) y presenta un estado pendiente si falta el mensaje.
- Se añaden textos de ejemplo editables en `src/content/texts/`. Se cargan con `?raw` y se parsean en
  `src/content/texts.ts`; la guía de edición está en `docs/work/regalo-publico/CONTENT.md`.
- Se implementa F1-T06: `LetterView` y `PoemView` renderizan párrafos y estrofas/versos en orden,
  conservan los saltos de línea y escapan el texto sin `dangerouslySetInnerHTML`.
- Se implementa F1-T05: tipos y registro de los cuatro regalos, rutas hash (`#/` y
  `#/regalo/<id>`), menú, shell de detalle, retorno al menú y estado recuperable para rutas
  desconocidas.
- Se añade Vitest 5.0.5 y pruebas unitarias de rutas, registro y formato de fecha.
- Se crea el scaffold de Vite 8.3.5 + React 19.3.1 + TypeScript 7.0.2 (F1-T04): `package.json`,
  `index.html`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx` y `src/app/App.tsx`.
- Se crea la infraestructura documental inicial: `AGENTS.md`, `README.md`, `docs/README.md`,
  `docs/PROJECT_CONTEXT.md`, `docs/ROADMAP.md` y plantillas.
