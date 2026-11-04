# AGENTS.md — cute-games

Reglas para agentes que trabajan en este repositorio. **Este es el único archivo de instrucciones.**

Es un documento *evergreen*: reglas, comandos y convenciones. No lleva changelog ni hashes de
commit; eso vive en `CHANGELOG.md` y en `docs/work/<slug>/HANDOFF.md`.

---

## 0. Qué es esto

Plantilla web para regalar: un menú con la fecha del regalo y cuatro vistas de ejemplo (carta, poema,
anillo y logro). El objetivo es que otra persona pueda clonar el repositorio, reemplazar el contenido
y publicar su propio regalo sin tocar los componentes.

**Estado actual:** fase 1 completada (menú, cuatro vistas, accesibilidad, pruebas y validación de
release). La fase 2 separa el motor público del contenido privado. Licencia MIT.

El repositorio es la **plantilla pública**: no contiene contenido personal. El contenido real de un
regalo vive en un repositorio privado derivado de esta plantilla.

---

## 1. Reglas no negociables

| Regla | Detalle |
|---|---|
| **No inventar contenido** | Fecha, cartas, poemas, mensajes, assets o secuencias solo si están aprobados. Si falta, usar estado pendiente y registrarlo. |
| **Sin backend** | No añadir servidor, base de datos, autenticación, CMS, pagos ni APIs sin aprobación explícita. |
| **Sin app nativa ni PWA** | No añadir iOS nativo, manifest, service worker u offline en esta fase. |
| **Sin plugins** | La extensibilidad se resuelve con un registro explícito de tipos de vista, no con carga dinámica de código. |
| **Contenido separado de vistas** | Textos y fecha viven en `src/content/`; los componentes no incrustan copy definitivo. |
| **Dependencias justificadas** | No agregar librerías si la plataforma o el código propio resuelven el caso. |
| **Archivos ≤ 1000 líneas** | Si se supera, se justifica y se divide por responsabilidad. |
| **Tests cuando corresponda** | Ejecutar las verificaciones de la tarea. No crear suites gigantes por iniciativa propia. |
| **Commits atómicos** | Un cambio verificable por commit. |
| **Push con aprobación** | Los commits y merges locales son libres. Publicar, crear repos remotos, hacer `push` o cambiar la visibilidad de un repo requiere aprobación explícita. |
| **No commitear** | `node_modules/`, `dist/`, `.env`, credenciales, reportes de test o artefactos de build. |
| **Sin contenido personal en público** | Este repositorio no incluye nombres, fechas, textos ni assets personales. El contenido real va en un repo privado; un repo privado no es control de acceso. |
| **Licencia y assets** | MIT cubre el código propio. Cada asset requiere procedencia, permiso y atribución. No se incluyen personajes ni marcas de terceros. |

---

## 2. Stack objetivo

| Capa | Decisión |
|---|---|
| UI | React + TypeScript |
| Build | Vite |
| Estilos | CSS propio |
| Rutas | Hash routes (`#/`, `#/regalo/<id>`) |
| Contenido | Módulo TS + archivos de texto en `src/content/`; fase 2: `ContentBundle` |
| Hosting | Sitio estático con HTTPS; proveedor pendiente |
| Tests | Vitest 5.0.5 (unitarias) + Playwright 1.64.1 (E2E) |
| Licencia | MIT |

El stack se confirmó al crear el scaffold en F1-T04. Si aparece otra tecnología en el proyecto,
**detente y explica** antes de reemplazarla.

---

## 3. Comandos

Scaffold creado con Vite 8.3.5, React 19.3.1 y TypeScript 7.0.2. Requiere Node.js 22.12 o superior.

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm run preview
npm run validate:release
npm run build:release
```

`npm run build` ejecuta el typecheck y genera el sitio estático en `dist/`. `npm run test` ejecuta
las pruebas unitarias con Vitest. `npm run test:e2e` construye el sitio y ejecuta Playwright; la
primera vez requiere `npx playwright install chromium`. `npm run validate:release` falla si
`giftDate` es `null`, si un texto sigue siendo el de ejemplo o si queda contenido pendiente;
`npm run build:release` encadena esa validación con el build.

La validación anterior es de fase 1. Al implementar `ContentBundle`, `validate:release` deberá
validar el bundle y auditar el `dist`, con reglas distintas para la demo pública y la instancia
personal.

---

## 4. Documentación

```text
docs/
├── README.md              mapa de docs/
├── PROJECT_CONTEXT.md     qué es cute-games, stack y decisiones
├── ROADMAP.md             fases y trabajo futuro no comprometido
├── plans/                 especificaciones aprobadas
├── work/<slug>/           PLAN.md + HANDOFF.md del trabajo activo
├── templates/             plantillas de PLAN, HANDOFF y SESSION-START
└── archive/               trabajo cerrado y congelado
```

### Reglas

1. **Nada nuevo en la raíz de `docs/`** salvo `README.md`, `PROJECT_CONTEXT.md` y `ROADMAP.md`.
2. **Unidad de trabajo = `docs/work/<slug>/`** con `PLAN.md` (estable, ≤300 líneas) y
   `HANDOFF.md` (se reescribe, ≤150 líneas).
3. **Las especificaciones aprobadas viven en `docs/plans/`.** No se reescriben sin autorización.
4. **`docs/archive/` no se lee por defecto.** Está congelado.
5. **Slugs ASCII**, para portabilidad de rutas y ramas.

---

## 5. Flujo de trabajo

1. **Planificar:** leer `PROJECT_CONTEXT.md`, la especificación y el `PLAN.md` del slug. No tocar
   código si la tarea es solo de planificación.
2. **Implementar:** una unidad verificable a la vez. Si el plan contradice el repositorio, detenerse
   y explicar; no improvisar arquitectura.
3. **Verificar:** ejecutar las pruebas de la tarea y registrar el resultado real. Distinguir lo
   verificado de lo asumido.
4. **Handoff:** reescribir `HANDOFF.md` con estado, verificación y **una sola siguiente acción**.

El handoff es una guía para retomar, no una prueba de que el trabajo está completo. El siguiente
agente debe contrastarlo con los archivos y con Git.

---

## 6. Git

- **Rama:** `feat/<descripcion>` o `fix/<descripcion>`, en español y ASCII.
- **Commits:** `tipo(scope): descripción` en español, atómicos.
- **Push:** requiere aprobación explícita. No publicar contenido personal ni builds privados.
- **No** commitear `.env`, credenciales, `node_modules/`, `dist/` ni reportes de test.
- No ejecutar `git init` en este repositorio: ya tiene `.git`.

---

## 7. Contenido y accesibilidad

- Fecha como fecha calendario `YYYY-MM-DD`; visualizar con `Intl.DateTimeFormat('es-CL', ...)` o el
  formato que se apruebe. No convertir a UTC de forma que cambie el día.
- Cartas y poemas: preservar párrafos, estrofas y saltos de línea.
- No usar logos institucionales, fotos o tipografías externas sin aprobación y licencia.
- **Licencia y assets:** MIT cubre el código; no incorporar assets sin procedencia y permiso. Los
  personajes o marcas de terceros no se incluyen en el repositorio ni en el build.
- Objetivo de accesibilidad: **WCAG 2.1 AA**.
- Verificar sin scroll horizontal en 320, 375, 768 y 1024 px.
- Respetar `prefers-reduced-motion`; ninguna información debe depender de una animación.
- **Mini-juegos:** teclado y tacto, foco visible, estados anunciados y reinicio claro. No guardar
  datos de usuarios sin aprobación.
- **Release:** validar el bundle y auditar el build; no confiar en regex sobre archivos viejos. Las
  reglas de la demo pública y de la instancia personal son distintas.

---

## 8. Índice mínimo

| Documento | Para qué |
|---|---|
| [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) | entender el producto, stack y decisiones |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | fases y futuro no comprometido |
| [`docs/work/regalo-publico/PLAN.md`](docs/work/regalo-publico/PLAN.md) | tareas y estado de la plantilla |
| [`docs/work/regalo-publico/HANDOFF.md`](docs/work/regalo-publico/HANDOFF.md) | estado real |
| [`docs/work/regalo-publico/PRIVACY.md`](docs/work/regalo-publico/PRIVACY.md) | contenido público y privado |
| [`docs/work/regalo-publico/REPOS.md`](docs/work/regalo-publico/REPOS.md) | usar la plantilla en un repo privado |
| [`docs/work/regalo-publico/ASSETS.md`](docs/work/regalo-publico/ASSETS.md) | assets, procedencia y fallback |
| [`LICENSE`](LICENSE) | licencia MIT |
| [`docs/README.md`](docs/README.md) | mapa completo de docs |
| [`CHANGELOG.md`](CHANGELOG.md) | qué ya se hizo |
