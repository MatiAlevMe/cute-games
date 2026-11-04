# HANDOFF — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-04` · **Sesión:** contrato `ContentBundle`

## Objetivo

Convertir el proyecto en una plantilla pública configurable, con demo neutra, línea de tiempo por
fecha, tema celeste, mini-juegos y contenido privado separado.

## Estado actual

- Fases **P1–P4 completadas**. **P5 es el siguiente paso.**
- La app renderiza desde `demoBundle` (`src/content/demo.ts`); `App` recibe el bundle y resuelve
  ocasiones, bienvenida, fecha y regalo por id.
- El registro `giftViewRegistry` solo mapea `kind` a componente: no importa contenido ni definiciones.
- El repositorio es público y solo contiene la demo neutra: sin nombres, fechas, textos ni assets
  personales. La fecha `2026-01-01` del bundle es de ejemplo.
- Repo: `MatiAlevMe/cute-games` (público), rama `main`.
- No hay deploy. Licencia **MIT** para el código propio.

## Contrato implementado

- `src/content/types.ts`: `ContentBundle`, `SiteConfig`, `Occasion`, `ThemeConfig`.
- `src/content/demo.ts`: bundle de ejemplo con una ocasión, cuatro regalos y textos de ejemplo.
- `src/content/bundle.ts`: orden de ocasiones, orden de regalos, recorrido, búsqueda y precedencia de
  bienvenida.
- `src/content/validate.ts`: IDs `^[a-z0-9-]+$`, unicidad de IDs, fechas calendario, `kind` conocido
  y assets locales con `alt` o `decorative`.
- `src/content/date.ts`: parseo y formato de fecha calendario sin desfase UTC.
- `src/gifts/registry.ts`: solo el mapa `kind` → vista.

## Decisiones registradas

- **Contrato:** `ContentBundle` es la fuente de verdad; el registro de vistas solo mapea `kind`.
- **Rutas:** `#/regalo/<id>` con IDs únicos en todo el bundle; una ruta inválida sigue recuperable.
- **Bienvenida:** `Occasion.welcome` reemplaza a `SiteConfig.welcome`; si falta o está vacía, se usa
  la del sitio.
- **Orden:** ocasiones por fecha ascendente y luego por `id`; regalos por `order` y luego por array.
  Los regalos sin `order` quedan después de los que sí lo tienen.
- **Tema:** celeste por defecto; el alternativo usa arte original y es opcional (P6).
- **Validación de release:** la reescritura sobre el bundle es P9; el script actual sigue apuntando
  al contrato anterior y falla a propósito.

## Completado

- Contrato, validador, helpers de orden y precedencia de bienvenida.
- Migración de textos y definiciones de regalos al bundle importado.
- `GiftMenu` recibe ocasiones y muestra la bienvenida y la primera fecha; conserva la lista plana
  (el rediseño por línea de tiempo es P5).
- Fixtures de pruebas actualizados y nuevas pruebas de validación, orden y bienvenida.
- E2E ampliado para comprobar bienvenida y fecha del bundle.

## Verificación real

| Verificación | Resultado |
|---|---|
| `npm run typecheck` | OK |
| `npm run test` | OK — 7 archivos, 68 pruebas |
| `npm run test:e2e` | OK — 10 pruebas |
| `npm run build` | OK — `dist/` generado |
| `npm run validate:release` | Falla a propósito: no encuentra `giftDate` en `src/content/site.ts` (contrato anterior) |
| Búsqueda de términos personales | Sin contenido de regalo; solo el titular de la licencia y el nombre del repositorio |
| Revisión de `dist/` | Solo demo neutra; sin contenido privado |

**No verificado:** Safari/VoiceOver, deploy y mini-juegos (no existen todavía).

## Problemas conocidos

- `npm run validate:release` sigue fallando y no entiende el bundle. Su reescritura es **P9**, no P4.
- La fecha `2026-01-01` y los textos de la demo son de ejemplo; no son contenido aprobado.
- El menú aún es una lista plana; la línea de tiempo por ocasión es P5.
- `public/assets/` está vacío; el fallback de assets es P6.

## Siguiente acción

**Ejecutar P5: menú por fecha y bienvenida.** Reemplazar la lista plana por una línea de tiempo con
secciones por `Occasion`, fecha formateada con `Intl`, orden determinista y bienvenida configurable;
conservar `#/regalo/<id>` y no iniciar temas ni mini-juegos.

## Criterios de aceptación pendientes

- [x] Contrato `ContentBundle` implementado y probado.
- [ ] Menú por fecha con bienvenida y orden deterministas.
- [ ] Tema celeste y tema alternativo opcional con fallback original.
- [ ] Mini-juegos memoria y jardín de mensajes accesibles.
- [ ] Validación de release diferenciada para demo y privado.
- [ ] Deploy diferido; visualización local suficiente.

## Referencias

- Plan: `docs/work/regalo-publico/PLAN.md`
- Privacidad: `docs/work/regalo-publico/PRIVACY.md`
- Repositorios: `docs/work/regalo-publico/REPOS.md`
- Textos: `docs/work/regalo-publico/CONTENT.md`
- Assets: `docs/work/regalo-publico/ASSETS.md`
- Licencia: `LICENSE`
- Roadmap: `docs/ROADMAP.md`
- Reglas: `AGENTS.md`
