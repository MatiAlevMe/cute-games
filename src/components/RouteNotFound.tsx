import { menuHref } from '../app/router'

export function RouteNotFound() {
  return (
    <section aria-labelledby="not-found-title">
      <h1 id="not-found-title">Ruta no encontrada</h1>
      <p>El enlace no corresponde a un regalo disponible.</p>
      <a className="back-link" href={menuHref}>
        <span aria-hidden="true">←</span> Volver al menú
      </a>
    </section>
  )
}
