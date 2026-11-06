# Validar y auditar releases

El validador comprueba el `ContentBundle` activo y los archivos del `dist/` real. No inspecciona
fuentes antiguas con expresiones regulares ni publica el build.

## Demo pública

En este repositorio, `npm run build:release` construye y valida la demo pública. El validador compara
el bundle completo con la huella SHA-256 revisada que guarda
[`scripts/release-policy.mjs`](../../../scripts/release-policy.mjs). Si el contenido cambia, el
release se bloquea. No reemplaces la huella automáticamente: primero revisa el bundle y el `dist/`,
confirma que no contienen información personal y actualízala deliberadamente como parte del cambio.

La huella permite aprobar solo una demo pública concreta; no detecta por sí misma información privada
en otra copia del repositorio ni reemplaza la revisión humana.

## Instancia personal

En el repositorio privado derivado, ejecuta `npm run build:release:personal`. Este modo requiere un
bundle estructuralmente válido, al menos una ocasión y regalo, contenido no pendiente y ausencia de
los marcadores de plantilla conocidos. No publiques ni subas el `dist/`: contiene los textos que
Vite compiló y es legible para cualquiera si se sirve.

Los marcadores conocidos cubren el contenido neutro de esta plantilla, no nombres, fechas u otros
datos personales desconocidos. Antes de compartir o desplegar una instancia, revisa manualmente el
árbol, el historial, los assets y `dist/`. Una validación exitosa no es una garantía de privacidad.

## Qué audita `dist/`

Ambos modos verifican que el directorio exista y tenga `index.html`, JavaScript compilado y archivos
no vacíos; que los assets locales del bundle estén presentes; que los valores de contenido actuales
aparezcan en los artefactos compilados; y que no haya referencias a recursos HTTP externos ni
artefactos de pruebas. La auditoría no intenta clasificar semánticamente los textos.

`npm run validate:release` valida la demo pública por defecto y requiere un `dist/` ya construido.
`npm run validate:release:personal` valida el modo personal. Para construir y validar en un solo paso,
usa los scripts `build:release` correspondientes.

## Revisión manual pública

- [ ] Bundle, textos, fixtures y documentación no contienen datos personales.
- [ ] Assets tienen procedencia, permiso y texto alternativo o decisión decorativa.
- [ ] `dist/` corresponde al bundle neutro revisado y no contiene datos personales.
- [ ] La huella pública solo se actualizó después de revisar el cambio.
- [ ] No se publica un build de una instancia personal.
