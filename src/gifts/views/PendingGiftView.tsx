import type { GiftViewProps } from '../types'

export function PendingGiftView(_props: GiftViewProps) {
  return (
    <p className="pending" data-content-status="pending">
      Contenido pendiente de aprobación. Esta vista aparecerá cuando el contenido esté configurado.
    </p>
  )
}
