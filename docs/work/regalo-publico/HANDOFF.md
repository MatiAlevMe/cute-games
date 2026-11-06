# HANDOFF — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-06` · **Sesión:** P5, menú por fecha

## Objetivo

Convertir el proyecto en una plantilla pública configurable con demo neutra, menú por fecha y
contenido privado separado.

## Estado actual

- **P1–P5 completadas. P6 es la siguiente fase.**
- `GiftMenu` presenta una línea de tiempo ordenada por fecha e id, con una sección por ocasión y sus
  regalos ordenados por `order` y orden original del array.
- Cada sección muestra `Occasion.welcome` si existe; en caso contrario, usa `SiteConfig.welcome`.
  Las fechas se formatean con `Intl.DateTimeFormat('es-CL', ...)` sin conversión UTC.
- Se mantienen `#/regalo/<id>`, el retorno al menú, el estado de ruta recuperable, el foco al cambiar
  de ruta y la navegación por teclado.
- `giftViewRegistry` sigue limitándose a mapear `kind` a vistas. La demo permanece neutra.
- `validate:release` no se modificó ni se ejecutó; continúa apuntando al contrato de fase 1. Su
  migración y auditoría de `dist/` corresponden a P9.

## Archivos relevantes

- `src/components/GiftMenu.tsx`: línea de tiempo y presentación semántica.
- `src/content/bundle.ts`: orden determinista y resolución de bienvenida.
- `src/content/date.ts`: formato de fecha calendario sin desfase.
- `tests/unit/menu.test.tsx`, `tests/unit/bundle.test.ts` y `tests/e2e/navigation.e2e.ts`: cobertura de
  menú, orden, bienvenida, navegación y viewports.
- `docs/work/regalo-publico/PLAN.md`: fases y tareas; P5 completada, P6 siguiente.

## Verificación real

| Verificación | Resultado |
|---|---|
| `npm run typecheck` | OK |
| `npm run test` | OK — 7 archivos, 69 pruebas |
| `npm run test:e2e` | OK — 10 pruebas; incluye teclado, rutas y 320/375/768/1024 px sin overflow horizontal |
| `npm run build` | OK — `dist/` generado |
| Búsqueda de indicadores personales en el árbol | Solo coincidió el titular de `LICENSE` |
| Búsqueda de esos indicadores en `dist/` | Sin coincidencias |
| `npm run validate:release` | No ejecutado; permanece pendiente intencionalmente para P9 |

No se verificaron Safari/VoiceOver ni despliegue.

## Siguiente acción

**Ejecutar P6: implementar el tema celeste y el fallback visual original, sin assets ni marcas de
terceros.**

## Referencias

- Plan: `docs/work/regalo-publico/PLAN.md`
- Privacidad: `docs/work/regalo-publico/PRIVACY.md`
- Repositorios: `docs/work/regalo-publico/REPOS.md`
- Assets: `docs/work/regalo-publico/ASSETS.md`
- Licencia: `LICENSE`
