# Guía de textos — regalo-publico

Los textos visibles viven en `src/content/texts/`, separados de las vistas. Las definiciones de cada
regalo y su fecha viven en el `ContentBundle` de `src/content/demo.ts`. No hay CMS ni editor web: para
cambiarlos se edita el archivo, se revisa en local y se vuelve a construir el sitio.

> **Límite público/privado:** este repositorio es público y sus textos son de ejemplo. Los textos de
> un regalo real no se copian aquí, ni a los fixtures, ni al build. Vive en un repositorio privado
> derivado de la plantilla. Una URL oculta no es control de acceso.

## Dónde está cada texto

| Archivo | Vista | Formato |
|---|---|---|
| [`src/content/texts/carta.txt`](../../../src/content/texts/carta.txt) | Carta | Un párrafo por bloque, separados por una línea en blanco. |
| [`src/content/texts/poema.txt`](../../../src/content/texts/poema.txt) | Poema | Una estrofa por bloque, separadas por una línea en blanco. Cada línea no vacía es un verso. |
| [`src/content/texts/anillo.txt`](../../../src/content/texts/anillo.txt) | Anillo | Un mensaje breve en texto plano. |
| [`src/content/texts/logro.txt`](../../../src/content/texts/logro.txt) | Logro | Un mensaje breve en texto plano. |

La memoria del robot no usa archivos de texto: sus parejas se configuran en el regalo `robot-memory`
dentro de `src/content/demo.ts`, mediante `content: { pairs: [...] }`. Cada etiqueta debe ser única y
no vacía; se necesitan al menos dos parejas. La vista crea dos cartas por etiqueta y las baraja al
iniciar y al reiniciar. Si no se configura contenido, muestra el estado pendiente.

El jardín de mensajes se configura en el regalo `message-garden` mediante
`content: { messages: [...] }`. Cada elemento es un mensaje de texto plano no vacío. Activar una flor
revela su mensaje; los mensajes revelados permanecen visibles hasta reiniciar el jardín. Si no hay
contenido aprobado, se usa `content: null` y se muestra el estado pendiente. La demo pública mantiene
ese estado pendiente: no se inventa texto de ejemplo.

Los archivos actuales contienen **textos de ejemplo**. No son contenido definitivo: sirven para
comprobar las vistas y deben reemplazarse por el contenido aprobado.

## Reglas de edición

1. **Carta:** separa los párrafos con una línea en blanco. Un salto de línea simple dentro de un
   párrafo también se conserva.
2. **Poema:** separa las estrofas con una línea en blanco. Cada línea dentro de la estrofa es un
   verso; no hace falta añadir `<br>`.
3. **Anillo y Logro:** escribe un solo mensaje. Para esta fase no se admiten varias líneas con
   formato propio; si se necesita, se amplía la vista con aprobación.
4. **Texto plano:** no uses HTML, Markdown ni etiquetas. El contenido se muestra literal y React lo
   escapa; no se interpreta como HTML.
5. **UTF-8:** guarda los archivos en UTF-8 para conservar tildes, `ñ` y signos como `¿` o `¡`.
6. **Sin contenido inventado:** si aún no hay texto aprobado, deja el archivo vacío; la vista mostrará
   un estado pendiente.
7. **Fixtures fuera de producción:** los textos de prueba de las pruebas unitarias viven en
   `tests/`, nunca en `src/content/`.

## Cómo cambiarlos y verlos

```bash
npm run dev
```

Abre `http://localhost:5173/#/regalo/carta`, `#/regalo/poema`, `#/regalo/anillo`, `#/regalo/logro`,
`#/regalo/memoria-robot` o `#/regalo/jardin-mensajes` y revisa el resultado. Después ejecuta:

```bash
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run validate:release
```

El build incorpora los textos al sitio estático. **Editar un `.txt` no actualiza un sitio ya
publicado:** hay que volver a construir y desplegar.

## Cómo se conectan

1. `src/content/texts.ts` importa los `.txt` con `?raw` y los convierte en datos tipados.
2. `src/content/demo.ts` asigna esos datos a cada regalo dentro del `ContentBundle` (`paragraphs`,
   `stanzas` o `message`). `App` recibe el bundle y resuelve ocasiones, bienvenida y regalo; el
   registro de vistas solo mapea `kind` a la vista y no importa contenido.
3. `LetterView`, `PoemView`, `RingView` y `AchievementView` renderizan esos datos; las vistas de
   mini-juegos crean sus controles desde el contenido configurado. Las vistas no contienen copy
   definitivo.

Si un archivo queda vacío, el parser devuelve una lista vacía o `null` y la vista muestra un estado
pendiente explícito en lugar de una pantalla rota.

## Validación antes de publicar

- [ ] Carta, poema, anillo y logro ya no contienen el texto de ejemplo.
- [ ] El contenido coincide exactamente con la versión aprobada.
- [ ] `npm run typecheck`, `npm run test`, `npm run test:e2e` y `npm run build` pasan.
- [ ] `npm run validate:release` pasa (fecha y textos definitivos).
- [ ] Se revisaron las rutas en 320, 375, 768 y 1024 px sin scroll horizontal.
- [ ] La fecha real está configurada en `Occasion.date` (`src/content/demo.ts`).
- [ ] El build personal no se publica y se revisa solo en local.
