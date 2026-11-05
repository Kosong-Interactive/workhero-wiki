import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'

export default function WebGLPlay() {
  const { tr } = useLang()
  const frame = useRef<HTMLIFrameElement>(null)
  const [attempt, setAttempt] = useState(0)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [failed, setFailed] = useState(false)
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return
      const data = event.data
      if (!data || data.type !== 'workhero-load') return
      if (data.status === 'ready') setLoading(false)
      else if (data.status === 'error') setFailed(true)
      else if (data.status === 'loading' && typeof data.progress === 'number' && Number.isFinite(data.progress)) {
        setProgress(value => Math.max(value, Math.min(1, Math.max(0, data.progress))))
      }
    }
    window.addEventListener('message', receive)
    const timer = window.setTimeout(() => setSlow(true), 15000)
    return () => { window.removeEventListener('message', receive); window.clearTimeout(timer) }
  }, [attempt])
  function retry() {
    setProgress(0); setFailed(false); setSlow(false); setLoading(true)
    setAttempt(value => value + 1)
  }
  return <div className="webgl-player">
    <h1 className="webgl-sr-only">WorkHero</h1>
    <div className="webgl-stage" aria-busy={loading}>
    <iframe key={attempt} ref={frame} className="webgl-frame" src="/workhero-html/index.html" title={tr('Play WorkHero', 'Main WorkHero')}
      allow="autoplay; fullscreen" allowFullScreen />
    {loading && <div className="webgl-loading">
      <section className="shop-card webgl-loading-card">
        <img src="/workhero-title.png" alt="WorkHero" />
        <h2 role={failed ? 'alert' : 'status'}>{failed ? tr('Could not load the game', 'Game gagal dimuat') : tr('Loading WorkHero', 'Memuat WorkHero')}</h2>
        {failed ? <>
          <p>{tr('Check your connection and try again.', 'Periksa koneksimu lalu coba lagi.')}</p>
          <button className="play-btn" type="button" onClick={retry}>{tr('Try again', 'Coba lagi')}</button>
        </> : <>
          <progress max="1" value={progress} aria-label={tr('Game loading progress', 'Progres memuat game')} />
          <strong>{Math.floor(progress * 100)}%</strong>
          <p>{progress >= .9 ? tr('Starting the game…', 'Menyiapkan game…') : tr('Downloading game files…', 'Mengunduh file game…')}</p>
          {slow && <small>{tr('The first load can take longer. Keep this page open.', 'Loading pertama bisa lebih lama. Tetap buka halaman ini.')}</small>}
        </>}
      </section>
    </div>}
    </div>
  </div>
}
