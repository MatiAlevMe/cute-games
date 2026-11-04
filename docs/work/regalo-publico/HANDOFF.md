# HANDOFF — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-04` · **Sesión:** publicación de la plantilla

## Objetivo

Convertir el proyecto en una plantilla pública configurable, con demo neutra, línea de tiempo por
fecha, tema celeste, mini-juegos y contenido privado separado.

## Estado actual

- Fases **P1, P2 y P3 completadas**. **P4 es el siguiente paso.**
- El repositorio es público y solo contiene la demo neutra: sin nombres, fechas, textos ni assets
  personales.
- Repo: `MatiAlevMe/cute-games` (público), rama `main`, un commit inicial.
- No hay deploy: el sitio no está publicado en ningún hosting.
- Licencia: **MIT**, solo para el código propio.
- Contrato, menú por fecha, temas y mini-juegos: no implementados.

## Decisiones registradas

- **Contenido público y privado:** este repo tiene la demo; el contenido real vive en un repo privado
  derivado de la plantilla. Ver [`PRIVACY.md`](PRIVACY.md) y [`REPOS.md`](REPOS.md).
- **Repo privado:** no es control de acceso. Un build estático es legible si se sirve en la web.
- **Contrato:** `ContentBundle` es la fuente de verdad; el registro de vistas solo mapea `kind`.
- **Rutas:** `#/regalo/<id>` con IDs únicos en todo el bundle.
- **Bienvenida:** `Occasion.welcome` reemplaza a la del sitio; si falta, se usa la del sitio.
- **Orden:** ocasiones por fecha ascendente y luego por `id`; regalos por `order` y luego por array.
- **Tema:** celeste por defecto; el alternativo usa arte original y es opcional.
- **Mini-juegos:** memoria del robot y jardín de mensajes, entregados y verificados por separado.
- **Licencia:** MIT para el código; los assets requieren procedencia y permiso documentados.

## Completado

- `LICENSE` MIT y `"license": "MIT"` en `package.json`.
- Demo neutra: `site.ts`, textos de ejemplo, fixtures y documentación sin datos personales.
- `docs/work/regalo-publico/PRIVACY.md` con la política de contenido público y privado.
- `docs/work/regalo-publico/REPOS.md` con el flujo para usar la plantilla en un repo privado.
- `docs/work/regalo-publico/CONTENT.md` con la guía de edición de textos.
- Cuatro vistas, navegación, accesibilidad, Playwright y validación de release (fase 1).

## Verificación real

| Verificación | Resultado |
|---|---|
| `npm run typecheck` | OK |
| `npm run test` | OK |
| `npm run test:e2e` | OK |
| `npm run build` | OK |
| Búsqueda de términos personales | Sin resultados en el árbol ni en el historial |
| `git rev-list --all --count` | Un solo commit en la publicación inicial; sin historial heredado |
| `npm run validate:release` | Falla a propósito: fecha `null` y textos de ejemplo |

**No verificado:** revisión en Safari/VoiceOver, deploy y accesibilidad de los mini-juegos (no
existen todavía).

## Problemas conocidos

- `giftDate` sigue en `null`: la demo no muestra fecha.
- El validador de release usa regex sobre `site.ts` y textos; quedará obsoleto al migrar al bundle.
- La dirección visual de la fase 2 no está implementada.
- No hay assets: `public/assets/` está vacío.

## Siguiente acción

**Ejecutar P4: implementar el contrato `ContentBundle` y migrar la arquitectura.** Definir el
contrato y el validador, mover los textos a un bundle importado, hacer que `App` resuelva el bundle y
dejar que `giftViewRegistry` solo mapee `kind`. No iniciar P5 ni los mini-juegos antes de cerrar P4.

## Criterios de aceptación pendientes

- [ ] Contrato `ContentBundle` implementado y probado.
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
