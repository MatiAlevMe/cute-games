# SESSION-START — prompts de arranque

> Plantilla. Copiar el bloque que corresponda al inicio de una sesión y reemplazar `<slug>`.
> Regla mínima: **el handoff manda sobre cualquier recuerdo del plan**. Verificar el estado real
> de los archivos y de Git antes de escribir.

## Retomar trabajo en curso

```text
Lee AGENTS.md y docs/README.md.
Trabajo activo: docs/work/<slug>/. Lee PLAN.md y HANDOFF.md, y verifica el estado real
de los archivos y de Git antes de actuar.
Ejecuta solo la "Siguiente acción" del HANDOFF. No repitas lo ya completado.
Al terminar: reescribe HANDOFF.md (estado, verificación real, siguiente acción única) y
actualiza PLAN.md si cambió el alcance. No toques docs/archive/.
```

## Implementar la siguiente tarea

```text
Lee AGENTS.md, docs/PROJECT_CONTEXT.md y
docs/work/<slug>/PLAN.md + HANDOFF.md.
Inspecciona el repositorio real antes de escribir. No asumas que el scaffold existe.
Implementa únicamente la siguiente tarea pendiente del PLAN, respetando la arquitectura y
sin ampliar el alcance. Ejecuta las verificaciones de esa tarea y comunica resultados reales.
Si el plan contradice el repositorio o falta información crítica, detente y explica.
Al terminar, reescribe HANDOFF.md con una sola siguiente acción.
```

## Planificar algo nuevo

```text
Lee AGENTS.md y docs/README.md. Modo plan: no modifiques código.
Slug propuesto: <slug>. Lee docs/PROJECT_CONTEXT.md y la especificación relacionada.
Escribe docs/work/<slug>/PLAN.md usando docs/templates/PLAN.md y espera aprobación.
```

## Revisión independiente

```text
Actúa como revisor independiente. Lee AGENTS.md, docs/work/<slug>/PLAN.md,
la especificación y el diff actual. No modifiques archivos.
Distingue defectos confirmados de sospechas, con archivo y línea.
Si no encuentras problemas, di qué revisaste y qué no alcanzaste a verificar.
```
