# cute-games — Contexto del proyecto

> Documento de entrada. Para el detalle del trabajo activo, ver
> [`work/regalo-publico/PLAN.md`](work/regalo-publico/PLAN.md).

## Qué es

Una plantilla web de regalo. La primera iteración presenta un menú con la fecha del regalo y cuatro
vistas de ejemplo:

1. **Carta:** texto largo en párrafos.
2. **Poema:** versos y estrofas con formato legible.
3. **Anillo:** presentación visual dedicada.
4. **Logro:** felicitación por algo que quieras celebrar.

El diseño debe permitir agregar regalos futuros y, más adelante, mini-juegos, sin duplicar la
navegación ni los componentes compartidos.

## Estado

- **Infraestructura documental:** creada.
- **Aplicación:** scaffold, menú, registro y navegación hash implementados (F1-T05).
- **Vistas de contenido:** las cuatro implementadas (F1-T06 a F1-T08) con textos de ejemplo.
- **Estilos y accesibilidad:** base implementada (F1-T09), verificada en Chrome; Safari/VoiceOver
  pendientes.
- **Pruebas y release:** Vitest, Playwright y `validate:release` implementados (F1-T10).
- **Fase 2:** en curso; P1–P6 completadas y P7 siguiente.
- **Privacidad:** este repositorio es público y solo contiene la demo. El contenido real de un regalo
  va en un repositorio privado derivado de la plantilla. Un repo privado no es control de acceso.
- **Fecha y textos:** la demo usa una fecha y textos de ejemplo. El contenido real se edita en
  `src/content/demo.ts` y `src/content/texts/` dentro del repositorio privado.

## Stack objetivo

| Componente | Decisión |
|---|---|
| UI | React 19.3.1 + TypeScript 7.0.2 |
| Build | Vite 8.3.5 |
| Estilos | CSS propio base; dirección visual pendiente |
| Rutas | Hash routes (`#/`, `#/regalo/<id>`) |
| Contenido | `ContentBundle` en `src/content/` + archivos de texto en `src/content/texts/` |
| Persistencia | Ninguna |
| Backend | Ninguno |
| Hosting | Sitio estático con HTTPS; proveedor pendiente |
| Tests | Vitest 5.0.5 (unitarias) + Playwright 1.64.1 (E2E); validación de release |
| Licencia | MIT |

El scaffold se creó en F1-T04 y la navegación en F1-T05. Si aparece otra tecnología en el
proyecto, hay que detenerse y explicar antes de reemplazarla.

## Arquitectura prevista

1. **Arranque:** inicializa la app, el idioma y los metadatos.
2. **Shell de regalos:** navegación, retorno, estructura de detalle y estados comunes.
3. **Registro de regalos:** mapa explícito de tipos de vista; las definiciones viven en el
   `ContentBundle`, no en el registro.
4. **Contenido:** `ContentBundle` con `site` y `occasions`; fecha, etiquetas y textos separados de la
   presentación.
5. **Vistas específicas:** carta, poema, anillo y logro.
6. **Estilos y assets:** reglas adaptables y recursos locales.

No se resuelven componentes a partir de código arbitrario en datos. No hay sistema de plugins.

Implementado hasta P6: arranque, shell, registro explícito de tipos, navegación hash, las cuatro
vistas de contenido, temas celeste/alternativo con paletas y arte local original, estilos accesibles,
pruebas E2E con Playwright y validación de release de fase 1. La fase 2 incluye el contrato
`ContentBundle` con `site` y `occasions`, validador, orden determinista, precedencia de bienvenida,
menú por línea de tiempo y fallback visual cuando falta un asset.

## Modelo de contenido

- `recipient`: valor neutro en la demo; el nombre real va en el contenido privado.
- La fecha es calendario `YYYY-MM-DD` y vive en `Occasion.date`; se valida y formatea sin desfase.
- `locale`: `es-CL` propuesto.
- Cada regalo tiene `id`, `kind`, `title`, `menuLabel`, `content`, `asset` opcional y `order`
  opcional.
- En fase 2, `ContentBundle` agrupa `site` y `occasions`; cada ocasión tiene fecha, título,
  bienvenida opcional y regalos. `Occasion.welcome` reemplaza a `SiteConfig.welcome`; si falta, se usa
  la del sitio.
- Los IDs de ocasión y de regalo usan `^[a-z0-9-]+$`; los de regalo son únicos en todo el bundle.
- Las ocasiones se ordenan por fecha ascendente y luego por `id`; los regalos por `order` y luego por
  el orden del array.
- Todas las ocasiones configuradas se muestran; no hay bloqueo por fecha en esta fase.
- Mientras no exista contenido aprobado, la vista muestra un estado pendiente explícito.
- La fecha se visualiza con `Intl.DateTimeFormat('es-CL', ...)` sin desfase UTC.

## Navegación

- `#/` muestra el menú.
- `#/regalo/<id>` muestra el detalle.
- El identificador se resuelve contra un registro permitido.
- El botón atrás del navegador y un control visible permiten volver al menú.
- Una ruta desconocida muestra un estado recuperable.

## Decisiones vigentes

1. **Sitio estático, sin backend ni base de datos.** El alcance no requiere persistencia.
2. **Contenido separado de las vistas.** No usar `.env` para cartas o poemas.
3. **Sin app nativa ni PWA en esta fase.** Se abre desde el navegador mediante un enlace.
4. **Sin contenido inventado.** Fecha, textos, assets y significados deben aprobarse.
5. **Accesibilidad objetivo WCAG 2.1 AA.** Verificar en 320, 375, 768 y 1024 px.
6. **Privacidad:** este repositorio es público y solo contiene la demo neutra. El contenido real vive
   en un repositorio privado derivado de la plantilla. Un repo privado no es control de acceso: el
   build se muestra en local y, si se publica, necesita autenticación real fuera del cliente.
7. **Licencia MIT** para facilitar la reutilización de la plantilla. Cubre el código propio, no el
   contenido personal ni assets de terceros; cada asset requiere procedencia y permiso documentados.
8. **Menú por fecha configurable.** Las fechas se ordenan y formatean sin desfase; el bloqueo por
   fecha, si existe, es solo cosmético. Todas las ocasiones configuradas se muestran en esta fase.
9. **Tema configurable:** celeste por defecto; el tema alternativo usa arte original y es opcional.
   No se incluyen personajes ni marcas de terceros.
10. **Contrato:** `ContentBundle` es la fuente de verdad. El registro de vistas solo mapea `kind` a un
    componente estático; no importa contenido ni carga código desde los datos.
11. **Validación de release:** debe validar el bundle y auditar el build, con reglas distintas para la
    demo pública y la instancia personal.

## Dónde está cada cosa

```text
AGENTS.md            reglas para agentes
README.md            descripción y puesta en marcha
docs/README.md       mapa de docs
docs/PROJECT_CONTEXT.md  este documento
docs/ROADMAP.md      fases y futuro no comprometido
docs/plans/          especificaciones aprobadas
docs/work/<slug>/    PLAN.md + HANDOFF.md del trabajo activo
docs/templates/      plantillas
docs/archive/        trabajo cerrado
```
