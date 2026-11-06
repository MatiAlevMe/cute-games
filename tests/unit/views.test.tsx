import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AchievementView } from '../../src/gifts/views/AchievementView'
import { LetterView } from '../../src/gifts/views/LetterView'
import { PoemView } from '../../src/gifts/views/PoemView'
import { RingView } from '../../src/gifts/views/RingView'
import { MiniGameView } from '../../src/gifts/views/MiniGameView'
import { MessageGardenView } from '../../src/gifts/views/MessageGardenView'
import {
  achievementGift,
  letterGift,
  messageGardenGift,
  poemGift,
  ringGift,
} from './fixtures'

describe('LetterView', () => {
  it('renderiza un párrafo por elemento y conserva el orden', () => {
    const markup = renderToStaticMarkup(<LetterView gift={letterGift} />)

    expect(markup.match(/<p class="letter__paragraph">/g)).toHaveLength(2)
    expect(markup.indexOf('Primer párrafo.')).toBeLessThan(
      markup.indexOf('Segundo párrafo'),
    )
  })

  it('conserva los saltos internos y escapa el texto sin interpretar HTML', () => {
    const markup = renderToStaticMarkup(
      <LetterView
        gift={{
          ...letterGift,
          content: { paragraphs: ['Línea uno\nlínea dos.', '<script>alert("x")</script>'] },
        }}
      />,
    )

    expect(markup).toContain('Línea uno\nlínea dos.')
    expect(markup).toContain('&lt;script&gt;')
    expect(markup).not.toContain('<script>')
  })

  it('muestra un estado pendiente si falta el contenido', () => {
    const markup = renderToStaticMarkup(
      <LetterView gift={{ ...letterGift, content: null }} />,
    )

    expect(markup).toContain('data-content-status="pending"')
    expect(markup).toContain('todavía no tiene un texto aprobado')
  })
})

describe('PoemView', () => {
  it('renderiza una estrofa por elemento y separa los versos con saltos', () => {
    const markup = renderToStaticMarkup(<PoemView gift={poemGift} />)

    expect(markup.match(/<p class="poem__stanza">/g)).toHaveLength(2)
    expect(markup.match(/<br\/>/g)).toHaveLength(3)
    expect(markup.indexOf('Primer verso.')).toBeLessThan(
      markup.indexOf('Tercer verso.'),
    )
  })

  it('muestra un estado pendiente si falta el contenido', () => {
    const markup = renderToStaticMarkup(<PoemView gift={{ ...poemGift, content: null }} />)

    expect(markup).toContain('data-content-status="pending"')
    expect(markup).toContain('todavía no tiene un texto aprobado')
  })

  it('no interpreta HTML del contenido', () => {
    const markup = renderToStaticMarkup(
      <PoemView
        gift={{
          ...poemGift,
          content: { stanzas: [['<strong>verso</strong>']] },
        }}
      />,
    )

    expect(markup).toContain('&lt;strong&gt;')
    expect(markup).not.toContain('<strong>')
  })
})

describe('RingView', () => {
  it('renderiza el mensaje aprobado', () => {
    const markup = renderToStaticMarkup(<RingView gift={ringGift} />)

    expect(markup).toContain('Mensaje de prueba.')
    expect(markup).toContain('<p class="ring__message">')
  })

  it('muestra un estado pendiente si falta el mensaje', () => {
    const markup = renderToStaticMarkup(
      <RingView gift={{ ...ringGift, content: { message: null } }} />,
    )

    expect(markup).toContain('data-content-status="pending"')
    expect(markup).toContain('todavía no tiene un mensaje aprobado')
  })

  it('renderiza el asset con su texto alternativo', () => {
    const markup = renderToStaticMarkup(
      <RingView
        gift={{ ...ringGift, asset: { src: '/assets/anillo.svg', alt: 'Anillo dorado' } }}
      />,
    )

    expect(markup).toContain('src="/assets/anillo.svg"')
    expect(markup).toContain('alt="Anillo dorado"')
  })

  it('deja el alt vacío cuando el asset es decorativo', () => {
    const markup = renderToStaticMarkup(
      <RingView
        gift={{
          ...ringGift,
          asset: { src: '/assets/anillo.svg', alt: 'Anillo dorado', decorative: true },
        }}
      />,
    )

    expect(markup).toContain('alt=""')
  })
})

describe('AchievementView', () => {
  it('renderiza el mensaje aprobado', () => {
    const markup = renderToStaticMarkup(<AchievementView gift={achievementGift} />)

    expect(markup).toContain('Felicitación de prueba.')
    expect(markup).toContain('<p class="achievement__message">')
  })

  it('muestra un estado pendiente si falta el mensaje', () => {
    const markup = renderToStaticMarkup(
      <AchievementView gift={{ ...achievementGift, content: { message: null } }} />,
    )

    expect(markup).toContain('data-content-status="pending"')
    expect(markup).toContain('todavía no tiene un mensaje aprobado')
  })

  it('no interpreta HTML del contenido', () => {
    const markup = renderToStaticMarkup(
      <AchievementView
        gift={{
          ...achievementGift,
          content: { message: '<strong>felicitación</strong>' },
        }}
      />,
    )

    expect(markup).toContain('&lt;strong&gt;')
    expect(markup).not.toContain('<strong>')
  })
})

describe('MiniGameView', () => {
  const gift = {
    id: 'memoria-robot',
    kind: 'robot-memory' as const,
    title: 'Memoria del robot',
    menuLabel: 'Memoria del robot',
    content: { pairs: ['1', '2', '3', '4'] },
  }

  it('renderiza el tablero, controles accesibles y estado inicial', () => {
    const markup = renderToStaticMarkup(<MiniGameView gift={gift} />)

    expect(markup.match(/class="robot-memory__card/g)).toHaveLength(8)
    expect(markup).toContain('aria-label="Carta 1, oculta"')
    expect(markup).toContain('>Reiniciar juego</button>')
    expect(markup).toContain('role="status"')
    expect(markup).toContain('Juego listo: 4 parejas.')
  })

  it('muestra pendiente si no hay pares configurados', () => {
    const markup = renderToStaticMarkup(
      <MiniGameView gift={{ ...gift, content: null }} />,
    )

    expect(markup).toContain('data-content-status="pending"')
  })
})

describe('MessageGardenView', () => {
  it('renderiza flores cerradas, reinicio y estado inicial', () => {
    const markup = renderToStaticMarkup(<MessageGardenView gift={messageGardenGift} />)

    expect(markup.match(/class="message-garden__button"/g)).toHaveLength(2)
    expect(markup).toContain('aria-label="Revelar flor 1"')
    expect(markup).toContain('aria-expanded="false"')
    expect(markup).toContain('hidden=""')
    expect(markup).toContain('>Reiniciar jardín</button>')
    expect(markup).toContain('role="status"')
    expect(markup).toContain('Jardín listo: 2 mensajes.')
  })

  it('muestra el estado pendiente si faltan mensajes', () => {
    const markup = renderToStaticMarkup(
      <MessageGardenView gift={{ ...messageGardenGift, content: null }} />,
    )

    expect(markup).toContain('data-content-status="pending"')
  })
})
