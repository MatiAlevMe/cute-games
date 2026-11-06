# ROADMAP

> Hitos de producto. Lo que aparece como “futuro” no es un requisito comprometido.

## Fase 0 — Infraestructura documental

**Estado:** completada.

- `AGENTS.md`, `README.md`, `CHANGELOG.md`.
- `docs/README.md`, `docs/PROJECT_CONTEXT.md`, `docs/ROADMAP.md`.
- Plantillas de PLAN, HANDOFF y SESSION-START.

## Fase 1 — Primera entrega de la plantilla

**Estado:** completada. El deploy de una instancia concreta queda fuera de esta plantilla.

Incluye:

- Menú con cuatro regalos: carta, poema, anillo y logro.
- Navegación de ida y retorno, rutas hash y estado recuperable.
- Contenido separado de las vistas y textos de ejemplo editables.
- Diseño adaptable, foco visible, teclado y `prefers-reduced-motion`.
- Pruebas unitarias (Vitest) y E2E (Playwright).
- Validación de release que bloquea fecha `null` y textos de ejemplo.

No incluye backend, autenticación, CMS, PWA ni mini-juegos.

## Fase 2 — Plantilla configurable y contenido privado

**Estado:** en curso; P1–P8 completadas y P9 siguiente.

Objetivo: convertir el proyecto en una plantilla reutilizable y separar el motor público del
contenido privado.

Incluye:

- Licencia MIT para el código, con alcance y procedencia de assets documentados.
- Contrato `ContentBundle` con `site` y `occasions`; el registro de vistas solo mapea tipos.
- Demo pública saneada, sin datos personales.
- Menú por línea de tiempo, bienvenida configurable y orden determinista.
- Tema celeste por defecto y un tema alternativo con arte original, opcional.
- Mini-juegos MVP entregados y verificados por separado: memoria del robot y jardín de mensajes.
- Validación de release diferenciada para demo pública e instancia personal, con auditoría del build.
- Documentación para que otras personas reutilicen la plantilla en su propio repo privado.

**No incluye:** deploy de una instancia personal, backend, autenticación, encriptación en cliente,
CMS, PWA, compra de hosting, contenido personal en el repo público y un tercer mini-juego.

Un repositorio privado no es control de acceso: un build estático contiene el contenido y es legible
si se sirve en la web. Si se publica, necesita una barrera de acceso real fuera del cliente.

Documentos de trabajo:

- `docs/work/regalo-publico/PLAN.md`
- `docs/work/regalo-publico/HANDOFF.md`
- `docs/work/regalo-publico/PRIVACY.md`
- `docs/work/regalo-publico/REPOS.md`
- `docs/work/regalo-publico/ASSETS.md`

## Fase 3 — Portafolio y despliegue

**Estado:** diferida. No hay proveedor ni modo de acceso decidido.

- Demo pública de portafolio en un sitio estático.
- Enlace visible a la licencia y al código fuente.

## Futuro no comprometido

Ideas que podrían evaluarse después de cerrar la fase 2, sin aprobación ni plazo:

- Un tercer mini-juego.
- Encriptación del contenido privado con una frase secreta.
- Backend/serverless con autenticación real.
- Instalación como PWA o funcionamiento offline.
- Edición de contenido sin rebuild mediante un CMS.
- Más tipos de regalo que reutilicen las vistas existentes.

Cualquiera de estas ideas requiere una decisión explícita y una nueva especificación. No se
implementan por iniciativa propia.
