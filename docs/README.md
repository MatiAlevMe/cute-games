# docs/ — mapa

Documentación del proyecto `cute-games`. Si un documento no encaja en una de estas carpetas, no se
escribe.

| Carpeta / archivo | Qué contiene | Se lee… | Se actualiza |
|---|---|---|---|
| [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) | Qué es cute-games, stack, arquitectura y decisiones | siempre al empezar | cuando cambia la arquitectura |
| [`ROADMAP.md`](ROADMAP.md) | Fases y trabajo futuro no comprometido | al planificar | al cerrar una fase |
| [`plans/`](plans/) | Especificaciones aprobadas | al implementar | solo con autorización |
| [`work/`](work/) | Trabajo activo: `<slug>/PLAN.md` + `HANDOFF.md` y guías del slug | solo la tarea activa | cada sesión |
| [`templates/`](templates/) | Plantillas de PLAN, HANDOFF y SESSION-START | al crear un documento | rara vez |
| [`archive/`](archive/) | Trabajo cerrado y congelado | no por defecto | nunca |

## Reglas

1. **Nada nuevo en la raíz de `docs/`.** Solo `README.md`, `PROJECT_CONTEXT.md` y `ROADMAP.md`.
2. **Un feature en curso = una carpeta en `work/`.** Su plan y su handoff comparten slug.
3. **Las especificaciones aprobadas viven en `plans/`.** No se reescriben sin autorización.
4. **`archive/` se congela.** No se actualizan sus enlaces internos.
5. **Slugs ASCII**, para portabilidad de rutas y ramas.

## Recorridos típicos

| Quiero… | Ruta |
|---|---|
| Entender el producto | `PROJECT_CONTEXT.md` |
| Implementar una tarea | `work/regalo-publico/PLAN.md` |
| Retomar trabajo | `work/regalo-publico/HANDOFF.md` |
| Separar contenido público y privado | `work/regalo-publico/PRIVACY.md` |
| Usar la plantilla en un repo privado | `work/regalo-publico/REPOS.md` |
| Editar carta, poema, anillo o logro | `work/regalo-publico/CONTENT.md` |
| Preparar assets | `work/regalo-publico/ASSETS.md` |
| Crear un documento nuevo | `templates/PLAN.md` o `templates/HANDOFF.md` |
| Ver lo que ya se hizo | `../CHANGELOG.md` |
