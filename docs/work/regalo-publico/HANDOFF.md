# HANDOFF — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-06` · **Sesión:** P8, jardín de mensajes

## Objetivo

Convertir el proyecto en una plantilla pública configurable con demo neutra, menú por fecha y
contenido privado separado.

## Estado actual

- **P1–P8 completadas. P9 es la siguiente fase.**
- La línea de tiempo ordena ocasiones y regalos de forma determinista; las bienvenidas y fechas
  mantienen la precedencia y el formato local documentados.
- `giftViewRegistry` mapea tipos a vistas estáticas. `robot-memory` se añadió como quinto tipo, sin
  cambiar el shell, la navegación hash ni el contrato general del bundle.
- `message-garden` es el sexto tipo. Cada flor revela un mensaje estático y lo conserva hasta el
  reinicio; la demo pública usa `content: null` porque no hay contenido aprobado. Mensajes ficticios
  se usan solo en fixtures de prueba, no en el bundle.
- El juego construye dos cartas por etiqueta configurada, baraja al iniciar y reiniciar, cuenta
  turnos, mantiene parejas acertadas y oculta intentos fallidos tras 900 ms.
- Ambos juegos usan botones nativos de teclado/tacto, foco visible y anuncios en `role="status"`. No
  se guarda estado del jugador ni se depende de animaciones.
- No se añadieron dependencias ni assets. `validate:release` no se modificó ni se ejecutó; su
  migración y auditoría de `dist/` corresponden a P9.
- Playwright verifica la app contra `vite preview` y levanta un servidor Vite separado para servir la
  fixture con mensajes de prueba; la compilación de producción no incluye esa fixture.

## Archivos relevantes

- `src/gifts/views/MiniGameView.tsx`: tablero, estado, anuncios y reinicio de la memoria.
- `src/gifts/views/MessageGardenView.tsx`: revelación de mensajes, progreso, anuncios y reinicio.
- `src/gifts/types.ts`, `src/gifts/registry.ts`: contratos de mini-juegos y registro explícito.
- `src/content/demo.ts`, `src/content/validate.ts`: contenido del bundle y validación de juegos.
- `src/styles/global.css`: tableros adaptables, objetivos táctiles y foco visible.
- `docs/work/regalo-publico/CONTENT.md`: cómo configurar contenido y mini-juegos.
- `tests/unit/views.test.tsx`, `tests/unit/bundle.test.ts`, `tests/unit/registry.test.ts`:
  renderizado, validación y registro.
- `tests/e2e/navigation.e2e.ts`: memoria y jardín (incluye fixture con mensajes de prueba), teclado,
  tacto, anuncios, reinicio, movimiento reducido y anchos de referencia.
- `docs/work/regalo-publico/PLAN.md`: estado y criterios de P1–P9.

## Verificación real

| Verificación | Resultado |
|---|---|
| `npm run typecheck` | OK |
| `npm run test` | OK — 8 archivos, 81 pruebas |
| `npm run test:e2e` | OK — 17 pruebas; incluye ambos juegos, teclado, tacto, anuncios, reinicio, `prefers-reduced-motion` y viewports 320/375/768/1024 px sin overflow |
| `npm run build` | OK — `dist/` generado |
| `npm run validate:release` | No ejecutado; permanece pendiente intencionalmente para P9 |

Las E2E verificaron un par acertado, intento fallido y finalización de memoria, además de revelación
persistente y reinicio del jardín. Se comprobó tacto, foco, anuncios, movimiento reducido y ausencia
de desbordamiento horizontal. Safari/VoiceOver no se verificaron.

## Siguiente acción

**Ejecutar P9: documentar la reutilización y migrar la validación/auditoría de release según
`PLAN.md`; no publicar sin aprobación.**

## Referencias

- Plan: `docs/work/regalo-publico/PLAN.md`
- Contenido: `docs/work/regalo-publico/CONTENT.md`
- Privacidad: `docs/work/regalo-publico/PRIVACY.md`
- Assets: `docs/work/regalo-publico/ASSETS.md`
- Licencia: `LICENSE`
