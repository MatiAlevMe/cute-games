# HANDOFF — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-06` · **Sesión:** P7, memoria del robot

## Objetivo

Convertir el proyecto en una plantilla pública configurable con demo neutra, menú por fecha y
contenido privado separado.

## Estado actual

- **P1–P7 completadas. P8 es la siguiente fase.**
- La línea de tiempo ordena ocasiones y regalos de forma determinista; las bienvenidas y fechas
  mantienen la precedencia y el formato local documentados.
- `giftViewRegistry` mapea tipos a vistas estáticas. `robot-memory` se añadió como quinto tipo, sin
  cambiar el shell, la navegación hash ni el contrato general del bundle.
- El juego construye dos cartas por etiqueta configurada, baraja al iniciar y reiniciar, cuenta
  turnos, mantiene parejas acertadas y oculta intentos fallidos tras 900 ms.
- Los controles son botones nativos de teclado/tacto; el foco es visible y el estado se anuncia en
  una región `role="status"`. No se guarda estado del jugador ni se depende de animaciones.
- La demo pública configura cuatro pares numéricos neutrales. No se añadieron dependencias ni assets.
- `validate:release` no se modificó ni se ejecutó; su migración y auditoría de `dist/` corresponden a
  P9.

## Archivos relevantes

- `src/gifts/views/MiniGameView.tsx`: tablero, estado, anuncios y reinicio de la memoria.
- `src/gifts/types.ts`, `src/gifts/registry.ts`: contrato `robot-memory` y registro explícito.
- `src/content/demo.ts`, `src/content/validate.ts`: pares demo y validación de etiquetas.
- `src/styles/global.css`: tablero adaptable, objetivos táctiles y foco visible.
- `docs/work/regalo-publico/CONTENT.md`: cómo configurar las parejas.
- `tests/unit/views.test.tsx`, `tests/unit/bundle.test.ts`, `tests/unit/registry.test.ts`:
  renderizado, validación y registro.
- `tests/e2e/navigation.e2e.ts`: emparejamiento, error, finalización, reinicio, teclado, tacto,
  movimiento reducido y anchos de referencia.
- `docs/work/regalo-publico/PLAN.md`: estado y criterios de P1–P9.

## Verificación real

| Verificación | Resultado |
|---|---|
| `npm run typecheck` | OK |
| `npm run test` | OK — 8 archivos, 78 pruebas |
| `npm run test:e2e` | OK — 14 pruebas; incluye juego, teclado, tacto, reinicio, `prefers-reduced-motion` y viewports 320/375/768/1024 px sin overflow |
| `npm run build` | OK — `dist/` generado |
| `npm run validate:release` | No ejecutado; permanece pendiente intencionalmente para P9 |

La E2E del juego verificó un par acertado, un intento fallido que vuelve a ocultarse, completar las
cuatro parejas, anuncios, reinicio y foco. Safari/VoiceOver no se verificaron.

## Siguiente acción

**Ejecutar P8: implementar el jardín de mensajes según `PLAN.md`, sin persistir aportes.**

## Referencias

- Plan: `docs/work/regalo-publico/PLAN.md`
- Contenido: `docs/work/regalo-publico/CONTENT.md`
- Privacidad: `docs/work/regalo-publico/PRIVACY.md`
- Assets: `docs/work/regalo-publico/ASSETS.md`
- Licencia: `LICENSE`
