# Contenido público y privado — regalo-publico

Este documento define qué se publica en este repositorio y qué se mantiene fuera. No es una prueba de
que la privacidad esté resuelta: cada decisión debe contrastarse con el árbol y el historial reales.

## Regla principal

Este repositorio es **público** y contiene solo la **demo neutra**. El contenido de un regalo real
—nombres, fechas, cartas, poemas, mensajes y assets— vive en un repositorio **privado** derivado de
esta plantilla.

Si el contenido personal llegó a publicarse, se trata como **expuesto**: borrarlo o reescribir el
historial no retira copias, forks ni cachés. La única defensa es no publicarlo.

## Qué se publica aquí

- El código del motor: componentes, rutas, estilos y scripts.
- Textos de ejemplo, claramente genéricos.
- Fixtures de prueba neutros.
- Documentación de la plantilla.
- Assets originales o con licencia compatible, con procedencia registrada.

## Qué no se publica aquí

- Nombres de personas, fechas privadas o dedicatorias.
- Cartas, poemas o mensajes reales.
- Fotos, imágenes o tipografías personales.
- Fixtures con datos reales.
- Documentación de una instancia personal.
- El build de una instancia personal.

## Cómo se separa en la práctica

1. Este repositorio es el `upstream`.
2. El repositorio privado se clona desde aquí y añade el contenido real.
3. Las mejoras del motor se traen con `git fetch upstream && git merge upstream/main`.
4. El repo privado nunca se hace público ni se publica su build.

El detalle operativo está en [`REPOS.md`](REPOS.md).

## Privacidad del build

- Un build estático contiene el contenido que importa Vite; si se sirve en la web, es legible.
- Un repositorio privado no es control de acceso.
- El build personal se muestra en local y no se sube al repositorio.
- `build:release:personal` comprueba contenido completo y audita el `dist`, pero no puede reconocer
  datos personales arbitrarios; siempre se requiere revisión humana.
- `build:release` en la plantilla pública solo acepta la huella de la demo neutra revisada. Cambiarla
  requiere auditar el bundle y el build antes de actualizar la huella.
- Si se publica, necesita autenticación real fuera del cliente.
- Ocultar tarjetas, rutas o fechas no es seguridad.
- No usar variables `VITE_*` para contenido sensible.

## Licencia y assets

- MIT cubre el código propio, no los textos personales ni assets de terceros.
- Cada asset requiere procedencia, autoría, licencia o permiso, uso permitido y `alt` o decisión de
  decorativo. El registro vive en [`ASSETS.md`](ASSETS.md).
- Sin registro completo, el asset no se incorpora.
- Solo se aceptan assets locales; el contenido no inyecta URLs externas.
- No se incluyen personajes, logos ni marcas de terceros.

## Checklist antes de publicar

- [ ] Búsqueda de términos personales en el árbol: sin resultados.
- [ ] Búsqueda de términos personales en el historial: sin resultados.
- [ ] Fixtures y documentación revisados, no solo `src/content/`.
- [ ] `dist/` revisado: sin datos personales.
- [ ] Los assets tienen procedencia y permiso.
- [ ] El contenido real está solo en el repositorio privado.
