# Usar la plantilla en un repositorio privado — regalo-publico

Guía para quien quiera usar `cute-games` como base de un regalo real sin publicar su contenido.
Complementa [`PRIVACY.md`](PRIVACY.md).

## Modelo

Dos repositorios:

| Repo | Visibilidad | Rol |
|---|---|---|
| `cute-games` | Público | Plantilla y motor. Es el `upstream` |
| tu repo de regalo | **Privado** | Contenido real: textos, fecha, bienvenida y assets autorizados |

El repo privado **desciende** de la plantilla: se clona desde aquí, no se crea desde cero. Así las
mejoras del motor se pueden traer con `upstream`.

Un fork de un repositorio público es público: no sirve como repo privado. Crea un repositorio privado
nuevo y empuja el contenido ahí.

## Pasos

1. **Clona la plantilla** con el nombre de tu repositorio privado:

   ```bash
   git clone https://github.com/<usuario>/cute-games.git mi-regalo
   cd mi-regalo
   ```

2. **Separa los remotos:** deja la plantilla como `upstream` y crea tu repositorio privado como
   `origin`:

   ```bash
   git remote rename origin upstream
   gh repo create <usuario>/mi-regalo --private
   git remote add origin git@github.com:<usuario>/mi-regalo.git
   ```

3. **Carga el contenido** en el `ContentBundle` de `src/content/demo.ts` y en `src/content/texts/`.
   Sigue [`CONTENT.md`](CONTENT.md).

4. **Revisa en local** y construye:

   ```bash
   npm install
   npm run dev
   npm run typecheck
   npm run test
   npm run build
   ```

5. **Sube solo al repo privado:** `git push -u origin main`.

## Sincronizar mejoras del motor

```bash
git fetch upstream
git merge upstream/main
```

Resuelve los conflictos manteniendo tu contenido y aceptando los cambios del motor. No copies código a
mano: duplica el mantenimiento.

## Reglas

- El repo privado nunca se hace público ni se publica su build.
- El contenido personal no se copia al repo público, a sus fixtures ni a su documentación.
- El build personal se revisa en local; una URL oculta no es control de acceso.
- No uses `git push --mirror`, `git push --all` ni `git filter-repo` sobre el repo público.
- No subas `dist/`, `node_modules/` ni `.env`.

## Checklist

- [ ] Repo privado creado y visible solo para ti.
- [ ] `origin` apunta al repo privado y `upstream` a la plantilla.
- [ ] Contenido real solo en el repo privado.
- [ ] `typecheck`, `test` y `build` en verde.
- [ ] El build no se publica.
