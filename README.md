# cute-games

Plantilla web para regalar: un menú con la fecha del regalo y cuatro vistas de ejemplo.

1. **Carta:** texto largo en párrafos.
2. **Poema:** versos y estrofas con formato legible.
3. **Anillo:** presentación visual dedicada.
4. **Logro:** felicitación por algo que quieras celebrar.

El diseño permite agregar regalos y, más adelante, mini-juegos, sin duplicar la navegación ni los
componentes compartidos.

## Estado

**Fase 1 completada: menú, cuatro vistas, accesibilidad, pruebas E2E y validación de release. Deploy
diferido.**

La fase 2 separa el motor público del contenido privado: contrato `ContentBundle`, menú por fecha,
tema configurable, mini-juegos y una demo neutra. El plan y el estado real están en
[`docs/work/regalo-publico/PLAN.md`](docs/work/regalo-publico/PLAN.md) y
[`docs/work/regalo-publico/HANDOFF.md`](docs/work/regalo-publico/HANDOFF.md).

## Stack

| Capa | Decisión |
|---|---|
| UI | React 19.3.1 + TypeScript 7.0.2 |
| Build | Vite 8.3.5 + `@vitejs/plugin-react` 6.1.2 |
| Estilos | CSS propio base; dirección visual pendiente |
| Rutas | Hash routes (`#/`, `#/regalo/<id>`) |
| Contenido | `src/content/site.ts` y `src/content/texts/`; textos de ejemplo |
| Tests | Vitest 5.0.5 (unitarias) + Playwright 1.64.1 (E2E) |
| Hosting | Sitio estático con HTTPS; proveedor pendiente |
| Licencia | MIT |

## Puesta en marcha

Requiere Node.js 22.12 o superior (verificado con 24.16.0) y npm (verificado con 11.16.0).

```bash
npm install
npm run dev              # servidor local en http://localhost:5173
npm run typecheck        # comprobación de tipos con tsc
npm run test             # pruebas unitarias con Vitest
npm run test:e2e         # build + pruebas E2E con Playwright
npm run build            # typecheck + build estático en dist/
npm run preview          # sirve dist/ localmente
npm run validate:release # falla si falta fecha o quedan textos de ejemplo
npm run build:release    # validación de release + build
```

`npm run build` genera `dist/index.html` y los assets con hash; no requiere backend ni servicios
externos. `npm run test:e2e` construye el sitio, lo sirve con `vite preview` y recorre menú, cuatro
vistas, retorno, ruta inválida, teclado, movimiento reducido y los cuatro anchos de referencia. La
primera vez hay que instalar el navegador de Playwright con `npx playwright install chromium`.

La fecha de la demo no está configurada y los textos son de ejemplo: `npm run validate:release` falla
a propósito hasta que se reemplacen. El build normal sigue funcionando para desarrollo.

## Usar la plantilla

1. Clona o forkea este repositorio.
2. Crea un repositorio **privado** para tu contenido real y usa este como `upstream`.
3. Reemplaza `src/content/site.ts` y `src/content/texts/`.
4. Revisa el resultado en local y construye el sitio.

El contenido personal no se publica en este repositorio. Un repositorio privado no es control de
acceso: un build estático contiene el contenido y es legible si se sirve en la web. Detalle en
[`docs/work/regalo-publico/REPOS.md`](docs/work/regalo-publico/REPOS.md) y
[`docs/work/regalo-publico/PRIVACY.md`](docs/work/regalo-publico/PRIVACY.md).

## Editar los textos

La carta, el poema, el mensaje del anillo y la felicitación están en `src/content/texts/` como
archivos `.txt` separados. Los actuales son de ejemplo y deben reemplazarse por el contenido real.
El formato de cada archivo está documentado en
[`docs/work/regalo-publico/CONTENT.md`](docs/work/regalo-publico/CONTENT.md).

## Rutas

- `#/` — menú con los cuatro regalos.
- `#/regalo/<id>` — detalle; ids de ejemplo: `carta`, `poema`, `anillo`, `logro`.
- Cualquier otra ruta muestra un estado recuperable con retorno al menú.

## Accesibilidad

- Enlace “Saltar al contenido”, foco visible y navegación completa por teclado.
- Al cambiar de ruta, el foco pasa al contenido principal y el título del documento se actualiza.
- Sin scroll horizontal en 320, 375, 768 y 1024 px.
- Se respeta `prefers-reduced-motion`; ninguna información depende de una animación.
- Objetivo WCAG 2.1 AA. Verificado con Playwright/Chrome en los cuatro anchos; la revisión en
  Safari/VoiceOver de iPhone sigue pendiente.

## Documentación

| Necesito… | Ir a |
|---|---|
| Entender el producto y las decisiones | [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) |
| Retomar el trabajo activo | [`docs/work/regalo-publico/HANDOFF.md`](docs/work/regalo-publico/HANDOFF.md) |
| Ver el plan de la plantilla | [`docs/work/regalo-publico/PLAN.md`](docs/work/regalo-publico/PLAN.md) |
| Usar la plantilla en un repo privado | [`docs/work/regalo-publico/REPOS.md`](docs/work/regalo-publico/REPOS.md) |
| Editar los textos | [`docs/work/regalo-publico/CONTENT.md`](docs/work/regalo-publico/CONTENT.md) |
| Ver la política de assets | [`docs/work/regalo-publico/ASSETS.md`](docs/work/regalo-publico/ASSETS.md) |
| Conocer las reglas para agentes | [`AGENTS.md`](AGENTS.md) |
| Ver el mapa de docs | [`docs/README.md`](docs/README.md) |

## Licencia

El código de este repositorio se distribuye bajo la **Licencia MIT**. Consulta [`LICENSE`](LICENSE)
para los términos completos: se permite usar, copiar, modificar y distribuir el código conservando
el aviso de copyright y el texto de la licencia.

La licencia cubre el código propio, no el contenido personal ni assets de terceros. Cada asset
incorporado debe tener procedencia, permiso y atribución documentados. Los personajes y marcas de
terceros no se incluyen en este repositorio ni en su build.

## Privacidad

Este repositorio es público y no contiene contenido personal. Si vas a usarlo para un regalo real,
mantén los textos, las fechas y los assets en un repositorio privado y no publiques el build. Una URL
difícil de adivinar no es control de acceso.
