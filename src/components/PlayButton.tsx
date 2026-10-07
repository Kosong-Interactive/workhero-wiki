import { useEffect, useRef, useState } from 'react'
import { GAME_PLAYABLE, PLAY_URL } from '../config'
import { useLang } from '../i18n'

export default function PlayButton({ big = false, children }: { big?: boolean; children: React.ReactNode }) {
  const { tr } = useLang()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const className = 'play-btn' + (big ? ' big' : '')

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (GAME_PLAYABLE) {
    return (
      <a className={className} href={PLAY_URL} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="play-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-emoji" aria-hidden="true">🚧</div>
            <h2 id="play-modal-title">{tr('Game under development', 'Game masih dalam pengembangan')}</h2>
            <p>
              {tr(
                'WorkHero: Career Idle is not ready to play yet. Check back soon!',
                'WorkHero: Career Idle belum bisa dimainkan. Nantikan segera ya!',
              )}
            </p>
            <button ref={closeRef} type="button" className="play-btn" onClick={() => setOpen(false)}>
              {tr('Got it', 'Mengerti')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
