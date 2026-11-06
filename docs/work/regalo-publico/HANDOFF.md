# HANDOFF — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-06` · **Sesión:** P6, tema visual

## Objetivo

Convertir el proyecto en una plantilla pública configurable con demo neutra, menú por fecha y
contenido privado separado.

## Estado actual

- **P1–P6 completadas. P7 es la siguiente fase.**
- `GiftMenu` presenta una línea de tiempo ordenada por fecha e id, con una sección por ocasión y sus
  regalos ordenados por `order` y orden original del array.
- Cada sección muestra `Occasion.welcome` si existe; en caso contrario, usa `SiteConfig.welcome`.
  Las fechas se formatean con `Intl.DateTimeFormat('es-CL', ...)` sin conversión UTC.
- Se mantienen `#/regalo/<id>`, el retorno al menú, el estado de ruta recuperable, el foco al cambiar
  de ruta y la navegación por teclado.
- `giftViewRegistry` sigue limitándose a mapear `kind` a vistas. La demo permanece neutra.
- `SiteConfig.theme` controla el tema, una paleta opcional y wallpaper/mascota local. Celeste es el
  tema por defecto; `alternativo` usa su propia paleta y tratamiento visual.
- Las paletas configuradas se limitan a colores `#RRGGBB`; el validador exige contraste AA para texto
  y 3:1 para el color de foco/borde. Las imágenes fallidas usan `fallback-wallpaper.svg` y
  `fallback-robot.svg`; ambas son ilustraciones originales del proyecto.
- `validate:release` no se modificó ni se ejecutó; continúa apuntando al contrato de fase 1. Su
  migración y auditoría de `dist/` corresponden a P9.

## Archivos relevantes

- `src/components/GiftMenu.tsx`: línea de tiempo y presentación semántica.
- `src/components/ThemeShell.tsx`, `src/components/ThemeArtwork.tsx` y `src/content/theme.ts`:
  aplicación de paletas y fallback visual.
- `public/assets/theme/`: SVG originales para el tema celeste y el fallback.
- `tests/unit/theme.test.tsx`, `tests/unit/bundle.test.ts` y `tests/e2e/navigation.e2e.ts`: paletas,
  contraste, validación de assets y fallback.
- `src/content/bundle.ts`: orden determinista y resolución de bienvenida.
- `src/content/date.ts`: formato de fecha calendario sin desfase.
- `tests/unit/menu.test.tsx`, `tests/unit/bundle.test.ts` y `tests/e2e/navigation.e2e.ts`: cobertura de
  menú, orden, bienvenida, navegación y viewports.
- `docs/work/regalo-publico/PLAN.md`: fases y tareas; P1–P6 completadas, P7 siguiente.

## Verificación real

| Verificación | Resultado |
|---|---|
| `npm run typecheck` | OK |
| `npm run test` | OK — 8 archivos, 75 pruebas |
| `npm run test:e2e` | OK — 11 pruebas; fallback visual, teclado, movimiento reducido y rutas a 320/375/768/1024 px sin overflow horizontal |
| `npm run build` | OK — `dist/` generado |
| Inspección de `dist/assets/theme/` | OK — 3 SVG locales; sin referencias externas a imágenes |
| `npm run validate:release` | No ejecutado; permanece pendiente intencionalmente para P9 |

Contraste AA comprobado para texto sobre fondo/superficie y 3:1 para color fuerte en ambas paletas,
con pruebas unitarias. El E2E conserva foco por teclado, `prefers-reduced-motion` y ausencia de
overflow en los cuatro anchos. No se verificaron Safari/VoiceOver ni despliegue.

## Siguiente acción

**Ejecutar P7: implementar el mini-juego de memoria del robot según `PLAN.md`.**

## Referencias

- Plan: `docs/work/regalo-publico/PLAN.md`
- Privacidad: `docs/work/regalo-publico/PRIVACY.md`
- Repositorios: `docs/work/regalo-publico/REPOS.md`
- Assets: `docs/work/regalo-publico/ASSETS.md`
- Licencia: `LICENSE`
