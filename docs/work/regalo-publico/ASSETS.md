# Material visual — regalo-publico

Este documento define qué assets puede incluir la plantilla pública y cómo se registra su procedencia.

## Regla de licencia

- **Código:** MIT. Cubre el código propio, no textos personales, imágenes, tipografías ni marcas de
  terceros.
- **Repo público:** solo arte original o assets con licencia compatible (MIT/CC0/equivalente) y
  procedencia documentada.
- **Repo privado:** se puede usar material cuyo uso esté autorizado por la persona dueña, para uso
  personal. “Aportado” no equivale automáticamente a permiso de uso, redistribución o publicación.
- No se descargan wallpapers de Pinterest, Reddit, sitios de fans ni bancos de imágenes sin licencia
  clara.
- No se incluyen personajes, logos ni marcas de terceros en el repositorio ni en el build público.
- No se usan URLs externas inyectadas desde el contenido. Los assets se sirven localmente.

## Registro de procedencia

Cada archivo incorporado debe registrar, como mínimo:

| Campo | Contenido |
|---|---|
| Archivo | Ruta local y nombre |
| Origen | URL, autor o “creado para este proyecto” |
| Autoría | Persona o entidad |
| Licencia / permiso | MIT, CC0, permiso escrito u otro |
| Uso permitido | Público, solo privado, solo local |
| Texto alternativo | `alt` o decisión de decorativo |

Si no se puede completar el registro, el asset no se incorpora.

## Qué buscar para una versión privada

| Material | Formato ideal | Uso |
|---|---|---|
| Mascota | SVG o PNG 1024×1024 | Portada o tarjeta de mini-juego |
| Expresiones | PNG transparente, 2–3 variantes | Estados de memoria o jardín de mensajes |
| Fondo vertical | 1080×1920 o 1440×2560 | Fondo móvil |
| Fondo horizontal | 1920×1080 | Fondo de escritorio |
| Referencia de paleta | Imagen o lista de colores | Ajustar tokens sin copiar el dibujo |

Requisitos:

- Sin marcas de agua ni texto incrustado.
- Preferible fondo transparente para personajes.
- Evitar imágenes con muchas capas o peso alto; optimizar antes de incorporarlas.
- Guardar el origen y la licencia de cada archivo en el repo privado.
- Verificar que el uso sea personal y que el material no se redistribuya.

## Fallback público

La plantilla incluye un robot original de paleta celeste, nubes, estrellas y cuadrícula pixel. Ese
fallback:

- es el valor por defecto de la plantilla;
- es un entregable de P6, no una funcionalidad ya existente;
- no reproduce el diseño exacto de ningún personaje de terceros;
- funciona sin assets externos;
- se puede reemplazar por un tema configurado;
- se usa cuando falta un asset configurado.

El tema alternativo es **opcional**, no el tema por defecto. El tema base es celeste abstracto y
configurable.

## Dónde colocarlo

```text
repo público/
├── public/assets/theme/
│   └── fallback-robot.svg
└── src/content/theme.ts       # tema por defecto y fallback

repo privado/
├── public/assets/theme/
│   ├── wallpaper-mobile.webp
│   ├── wallpaper-desktop.webp
│   └── mascot.png
└── src/content/theme.ts       # rutas, alt y decisiones de decoración
```

El contenido referencia las rutas; las vistas no incrustan imágenes ni URLs externas.

## Contrato mínimo de tema

```ts
interface ThemeConfig {
  id: 'celeste' | 'alternativo'
  palette?: {
    background: string
    surface: string
    primary: string
    primaryStrong: string
    accent: string
    text: string
  }
  wallpaper?: { src: string; alt: string; decorative?: boolean }
  mascot?: { src: string; alt: string; decorative?: boolean }
}
```

- Las imágenes informativas llevan `alt`; las decorativas usan `alt=""`.
- Si falta un asset, se usa el fallback original.
- No se permite inyectar HTML ni CSS arbitrario desde el contenido.
- Las rutas deben ser locales y validadas; no se aceptan URLs externas.
- El contraste se verifica con los tokens de cada tema, no solo con el tema celeste.

## Checklist antes de incorporar un asset

- [ ] Procedencia y permiso registrados.
- [ ] Uso permitido coherente con repo público o privado.
- [ ] Archivo optimizado y sin marcas de agua.
- [ ] `alt` decidido (texto o decorativo).
- [ ] Sin URLs externas.
- [ ] Sin personajes ni marcas de terceros en el repo público.
- [ ] Fallback original probado cuando el asset falta.
