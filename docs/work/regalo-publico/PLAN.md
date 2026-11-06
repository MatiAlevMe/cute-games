# PLAN — regalo-publico

**Slug:** `regalo-publico` · **Actualizado:** `2026-11-06`
**Estado:** `P1–P5 completadas; P6 siguiente`
**Puerta de privacidad:** [`PRIVACY.md`](PRIVACY.md) · **Repos:** [`REPOS.md`](REPOS.md)

## Objetivo

Convertir el proyecto en una plantilla pública, configurable y reutilizable: demo genérica para
portafolio, línea de tiempo por fechas, tema celeste, mini-juegos y contenido privado separado en un
repositorio propio de quien use la plantilla.

## Alcance

**Dentro:** licencia MIT, contenido público y privado separados, contrato de contenido, demo neutra,
menú por fecha, bienvenida configurable, tema celeste y tema alternativo con arte original,
mini-juegos MVP, documentación y validación de release.

**Fuera por ahora:** deploy de una instancia personal, backend, autenticación, encriptación en
cliente, CMS, PWA, edición sin rebuild, compra de planes de hosting, contenido personal en el repo
público y un tercer mini-juego.

## Decisiones aprobadas

1. **Licencia:** MIT para el código propio. No concede derechos sobre textos personales, assets de
   terceros ni marcas; cada asset necesita procedencia y permiso documentados.
2. **Privacidad:** este repositorio es público y solo contiene la demo neutra. El contenido real vive
   en un repositorio privado derivado de la plantilla.
3. **Repo privado:** no es control de acceso. Un build estático contiene el contenido y cualquiera con
   la URL puede leerlo. Si se publica, necesita una barrera real fuera del cliente; ocultar tarjetas,
   rutas o fechas no es seguridad.
4. **Menú:** línea de tiempo por fecha, ordenada ascendentemente y con fechas configurables.
5. **Tema:** celeste como base visual; el tema alternativo usa arte original y es opcional. No se
   incluyen personajes ni marcas de terceros.
6. **Mini-juegos MVP:** memoria del robot y jardín de mensajes, entregados y verificados por separado.
7. **Contrato:** `ContentBundle` es la fuente de verdad. El registro de vistas solo mapea `kind` a un
   componente estático; no importa contenido ni carga código desde los datos.
8. **Rutas:** se conserva `#/regalo/<id>` con IDs de regalo únicos en todas las ocasiones. Una ruta
   desconocida sigue siendo recuperable.
9. **Bienvenida:** `Occasion.welcome` reemplaza a `SiteConfig.welcome` cuando existe; si falta, se usa
   la del sitio.
10. **Orden:** ocasiones por `date` ascendente y, si empatan, por `id`; regalos por `order` y, si
    empatan o falta, por el orden del array. El orden debe ser determinista.
11. **Validación de release:** debe validar el bundle y auditar el build, con reglas distintas para la
    demo pública y la instancia personal.
12. **Push:** los commits y merges locales son libres; publicar requiere aprobación explícita.

## Modelo de contenido propuesto

```ts
interface SiteConfig {
  recipient: string
  welcome: string
  locale: string
  theme: ThemeConfig
}

interface Occasion {
  id: string
  date: string // YYYY-MM-DD, fecha calendario
  title: string
  welcome?: string
  gifts: readonly GiftDefinition[]
}

interface ContentBundle {
  site: SiteConfig
  occasions: readonly Occasion[]
}
```

- `GiftDefinition` conserva la unión discriminada actual y añade `order?: number`.
- Los IDs de ocasión y de regalo usan `^[a-z0-9-]+$`; los de regalo son únicos en todo el bundle.
- Las fechas se validan como fecha calendario y se formatean sin conversión que cambie el día.
- Cada `kind` debe existir en `giftViewRegistry`; un tipo desconocido falla en validación.
- `content: null` produce el estado pendiente explícito; no se inventa copy.
- Los assets son locales, con `alt` o `decorative`, y nunca URLs externas inyectadas desde contenido.
- No se permite inyectar HTML ni CSS arbitrario desde el bundle.

## Estado por fase

| Fase | Descripción | Estado |
|---|---|---|
| P1 | Licencia MIT y avisos | ✅ |
| P2 | Contenido público y privado separados | ✅ |
| P3 | Demo neutra y publicación de la plantilla | ✅ |
| P4 | Contrato `ContentBundle` y migración | ✅ |
| P5 | Menú por fecha y bienvenida | ✅ |
| P6 | Tema celeste y fallback original | ⏳ |
| P7 | Mini-juego memoria del robot | ⏳ |
| P8 | Mini-juego jardín de mensajes | ⏳ |
| P9 | Documentación, demo y release | ⏳ |

## Tareas

### P1 — Licencia MIT y avisos

- **Qué:** publicar el código bajo MIT con el titular correcto.
- **Cómo:** `LICENSE` MIT, `license` en `package.json` y sección de licencia en README.
- **Criterio de aceptación:** el repositorio declara MIT de forma consistente y aclara que la licencia
  cubre el código, no los textos personales ni assets de terceros.
- **Estado:** completada.

### P2 — Contenido público y privado separados

- **Qué:** definir qué se publica y qué no antes de exponer el repositorio.
- **Cómo:** documentar la separación en [`PRIVACY.md`](PRIVACY.md) y el flujo de uso en
  [`REPOS.md`](REPOS.md).
- **Criterio de aceptación:** la política está escrita; el repo público no contiene datos personales;
  el flujo para un repo privado está documentado.
- **Estado:** completada.

### P3 — Demo neutra y publicación de la plantilla

- **Qué:** dejar una demo genérica sin datos personales y publicar la plantilla con historial nuevo.
- **Cómo:** neutralizar `site.ts`, textos, fixtures y documentación; publicar el árbol saneado en un
  repositorio nuevo con un commit inicial; verificar tests, build y contenido de `dist/`.
- **Criterio de aceptación:** el árbol y el historial no contienen nombres, textos, fechas ni imágenes
  personales; los tests y E2E pasan; el `dist` fue revisado.
- **Verificación:** búsqueda de términos personales, `git rev-list --all --count`, `npm run typecheck`,
  `npm run test`, `npm run test:e2e`, `npm run build` e inspección de `dist/`.
- **Estado:** completada.

### P4 — Contrato `ContentBundle` y migración de arquitectura

- **Qué:** separar datos de contenido de las vistas y del registro de tipos.
- **Cómo:** definir el contrato y el validador; mover los textos a un bundle importado; hacer que
  `App` resuelva el bundle; `GiftMenu` recibe ocasiones; `giftViewRegistry` solo mapea `kind` a
  componente; conservar las rutas actuales; migrar en pasos pequeños.
- **Criterio de aceptación:** la app renderiza desde un `ContentBundle`; el registro y las vistas no
  importan contenido; IDs duplicados, fechas inválidas y `kind` desconocidos fallan en validación; la
  precedencia de bienvenida y el orden son deterministas; una ruta inválida sigue recuperándose.
- **Verificación:** `npm run typecheck`, pruebas unitarias de validación/orden/fechas/duplicados/
  bienvenida, `npm run test:e2e` y `npm run build`.
- **Estado:** completada. El bundle vive en `src/content/demo.ts`; el contrato y los helpers en
  `src/content/`; el registro solo mapea vistas. `validate:release` sigue pendiente de reescritura
  (P9).
- **Riesgos:** migración grande; no mezclar el rediseño del menú ni los juegos en esta fase.

### P5 — Menú por fecha y bienvenida

- **Qué:** reemplazar la lista plana por una línea de tiempo.
- **Cómo:** menú con bienvenida, secciones por `Occasion`, fecha formateada con `Intl`, orden
  ascendente y tarjetas de regalo dentro de cada fecha; rutas de detalle existentes; semántica de
  listas y encabezados coherente.
- **Criterio de aceptación:** una fecha con varios regalos se muestra agrupada; la bienvenida es
  configurable y respeta la precedencia; el orden es estable; no hay scroll horizontal en 320, 375,
  768 y 1024 px; el recorrido por teclado funciona.
- **Estado:** completada. La línea de tiempo agrupa regalos por ocasión, presenta la bienvenida de
  cada ocasión o la del sitio como fallback, y formatea cada fecha calendario sin desfase UTC.
- **Verificación:** typecheck, pruebas unitarias, E2E en las rutas y anchos de referencia, y build.

### P6 — Tema celeste y fallback original

- **Qué:** dar identidad visual sin depender de assets externos.
- **Cómo:** tokens de color, tarjetas tipo pantalla, fondo SVG original, tema `celeste` por defecto y
  tema alternativo con arte original opcional; assets configurables desde contenido; resolver fallback
  si falta un asset.
- **Criterio de aceptación:** ambos temas renderizan; el fallback original aparece si falta un asset;
  contraste AA; foco visible; reducción de movimiento; sin URLs externas ni personajes de terceros en
  el repo o build público.

### P7 — Mini-juego memoria del robot

- **Qué:** añadir el primer regalo interactivo sin duplicar el shell.
- **Cómo:** `MiniGameView` + registro explícito; `robot-memory` con pares configurables; estado,
  reinicio, teclado y tacto; anuncio de estado para tecnologías de asistencia; sin animación
  obligatoria.

### P8 — Mini-juego jardín de mensajes

- **Qué:** añadir el segundo regalo interactivo con mensajes estáticos configurables.
- **Cómo:** mensajes desde el bundle; interacción, reinicio, teclado y tacto; estados anunciados; sin
  persistencia ni backend; sin almacenar aportes de usuarios.

### P9 — Documentación, demo y validación de release

- **Qué:** dejar la plantilla lista para portafolio y reutilización.
- **Cómo:** README con stack, capturas, guía de contenido, licencia y demo; validación de release
  separada para demo pública e instancia privada; auditoría del `dist`; recorrido desde un clon limpio.
- **Criterio de aceptación:** otra persona puede forkear, reemplazar su contenido y construir sin tocar
  componentes; la demo pública no contiene datos personales.

## Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Contenido personal en repo público | Exposición irreversible | Demo neutra; contenido real en repo privado |
| Build “privado” accesible por URL | Falsa privacidad | Local; autenticación real fuera del cliente si se publica |
| `.env` tratado como secreto | Filtración en bundle | No usar `VITE_*` para contenido |
| Assets de terceros con copyright | Problema legal en portafolio | Solo arte original o licencia compatible |
| Deriva entre plantilla y repo privado | Mantenimiento doble | `upstream` y cambios limitados a contenido y assets |
| Mini-juegos sin accesibilidad | Exclusión y regresiones | Teclado, foco, estados anunciados y reducción de movimiento |
| Validador de release obsoleto | Release con contenido incompleto | Validar el bundle y auditar el `dist` |

## Registro

- `2026-10-30` — Se crea el slug y el scaffold.
- `2026-11-04` — Decisiones de producto aprobadas: MIT, línea de tiempo, tema celeste configurable,
  tema alternativo opcional y mini-juegos MVP.
- `2026-11-04` — P1 y P2 completadas; se publica la plantilla pública con historial nuevo y demo
  neutra.
- `2026-11-04` — P4 completada: contrato `ContentBundle`, validador, orden y bienvenida
  deterministas, demo migrada y registro de vistas sin contenido.
- `2026-11-06` — P5 completada: menú temporal por ocasión, bienvenida configurable, fechas locales,
  orden estable, semántica de listas y cobertura unitaria/E2E.
