# HANDOFF — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-06` · **Sesión:** P9, documentación y release

## Objetivo

Mantener una plantilla pública configurable con demo neutra y contenido personal separado en un repo
privado derivado.

## Estado actual

- **P1–P9 completadas.** Fase 2 cerrada; deploy personal queda fuera de alcance.
- `ContentBundle` es la fuente de contenido; la demo pública conserva los textos neutros y el jardín
  pendiente. Los mini-juegos no persisten datos.
- `npm run build:release` valida el bundle y la huella exacta de la demo pública, y audita `dist/`.
- `npm run build:release:personal` está dirigido al repo privado; exige contenido completo y
  marcadores de plantilla conocidos ausentes. No publica el build.
- La detección semántica de datos personales no es automatizable de forma general. Revisar el árbol,
  historial, assets y `dist/` manualmente; un build estático contiene el contenido.
- README incluye una captura neutra. Guías: `CONTENT.md`, `REPOS.md`, `PRIVACY.md` y `RELEASE.md`.
- No se abrió ni modificó el repo privado.

## Archivos relevantes

- `scripts/validate-release.mjs`: carga el bundle activo y coordina reglas y auditoría.
- `scripts/release-policy.mjs`: huella pública, reglas personales y auditoría de archivos compilados.
- `tests/unit/release.test.mjs`: modos de release y auditoría aislada de `dist/`.
- `docs/work/regalo-publico/RELEASE.md`: modos, límites y revisión manual.
- `docs/work/regalo-publico/capturas/demo-menu.png`: captura incluida en README.
- `docs/work/regalo-publico/PLAN.md`: estado y verificaciones de P1–P9.

## Verificación real

| Verificación | Resultado |
|---|---|
| `npm run typecheck` | OK |
| `npm run test` | OK — 9 archivos, 87 pruebas |
| `npm run test:e2e` | OK — 17 pruebas, incluidos juegos, teclado, tacto, movimiento reducido y anchos 320/375/768/1024 px |
| `npm run build:release` | OK — typecheck, build y modo público; 7 archivos de `dist/` auditados |
| `npm run validate:release:personal` en esta demo pública | Rechazó correctamente valores genéricos, marcadores y contenido pendiente; no es una prueba sobre el repo privado |

La auditoría comprueba archivos y contenido del `dist/` generado, assets locales del bundle y referencias
a recursos HTTP externos. El modo público se fija a una huella SHA-256 revisada. La captura fue abierta
y revisada; muestra únicamente contenido de demo. Safari/VoiceOver siguen pendientes.

## Siguiente acción

**Decidir si se inicia la fase 3 (portafolio/despliegue); no desplegar una instancia personal sin una
decisión de acceso y privacidad aprobada.**

## Referencias

- Plan: `docs/work/regalo-publico/PLAN.md`
- Releases: `docs/work/regalo-publico/RELEASE.md`
- Privacidad: `docs/work/regalo-publico/PRIVACY.md`
- Repositorios: `docs/work/regalo-publico/REPOS.md`
- Licencia: `LICENSE`
