import { createRoot } from 'react-dom/client'
import type { GiftDefinition } from '../../../src/gifts/types'
import { MessageGardenView } from '../../../src/gifts/views/MessageGardenView'
import './styles.css'

const gift: Extract<GiftDefinition, { kind: 'message-garden' }> = {
  id: 'jardin-prueba',
  kind: 'message-garden',
  title: 'Jardín de mensajes de prueba',
  menuLabel: 'Jardín de mensajes de prueba',
  content: {
    messages: ['Mensaje de prueba uno.', 'Mensaje de prueba dos.', 'Mensaje de prueba tres.'],
  },
}

const root = document.getElementById('root')
if (!root) throw new Error('Falta el nodo raíz de la fixture.')

createRoot(root).render(<MessageGardenView gift={gift} />)
