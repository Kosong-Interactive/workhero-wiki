import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

export default function WebGLPlay() {
  const { tr } = useLang()
  const host = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else if (host.current?.requestFullscreen) await host.current.requestFullscreen()
      else setMessage(tr('Fullscreen is unavailable in this browser.', 'Fullscreen belum tersedia di browser ini.'))
    } catch {
      setMessage(tr('Fullscreen is unavailable. You can keep playing here.', 'Fullscreen tidak tersedia. Kamu tetap bisa main di sini.'))
    }
  }
  return <div className="webgl-player" ref={host}>
    <header className="webgl-toolbar">
      <Link to="/play">← {tr('Back', 'Kembali')}</Link>
      <h1>WorkHero</h1>
      <button type="button" onClick={fullscreen}>{tr('Fullscreen', 'Layar penuh')}</button>
    </header>
    <iframe className="webgl-frame" src="/workhero-html/index.html" title={tr('Play WorkHero', 'Main WorkHero')}
      allow="autoplay; fullscreen" allowFullScreen />
    {message && <p className="webgl-message" role="status">{message}</p>}
  </div>
}
