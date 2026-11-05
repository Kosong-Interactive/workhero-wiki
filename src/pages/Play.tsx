import { Link } from 'react-router-dom'
import { ANDROID_APK_URL, GAME_PLAYABLE, PLAY_URL } from '../config'
import { useLang } from '../i18n'

export default function Play() {
  const { tr } = useLang()
  return <>
    <h1>{tr('Play WorkHero', 'Main WorkHero')}</h1>
    <p className="lead">{tr('Choose where you want to play. Your next release starts here.', 'Pilih tempat bermainmu. Release berikutnya dimulai di sini.')}</p>
    <div className="card-grid play-platforms">
      <section className="shop-card play-platform" aria-labelledby="browser-title">
        <div className="platform-symbol" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="26" height="18" rx="3" /><path d="M11 28h10M16 23v5M13 10l7 4-7 4z" /></svg>
        </div>
        <span className="badge">Unity WebGL</span>
        <h2 id="browser-title">{tr('Play in your browser', 'Main di browser')}</h2>
        <p>{tr('Play WorkHero right here. No download needed.', 'Main WorkHero langsung di sini. Tidak perlu download.')}</p>
        {GAME_PLAYABLE ? <Link className="play-btn" to={PLAY_URL}>{tr('Play now', 'Main sekarang')} <span aria-hidden="true">▶</span></Link>
          : <button className="play-btn" type="button" disabled>{tr('Under development', 'Dalam pengembangan')}</button>}
        <small className="muted">{tr('Play inside this website.', 'Main langsung di website ini.')}</small>
      </section>
      <section className="shop-card play-platform" aria-labelledby="android-title">
        <div className="platform-symbol" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="16" height="28" rx="4" /><path d="M13 6h6M16 12v9M12 17l4 4 4-4M14 26h4" /></svg>
        </div>
        <span className="badge">Android · APK</span>
        <h2 id="android-title">{tr('Play on Android', 'Main di Android')}</h2>
        <p>{ANDROID_APK_URL
          ? tr('Download the Android APK and take WorkHero with you.', 'Download APK Android dan main WorkHero di ponselmu.')
          : tr('The Android APK download will be available here soon.', 'Link download APK Android akan tersedia di sini. Nantikan segera!')}</p>
        {ANDROID_APK_URL ? <a className="play-btn" href={ANDROID_APK_URL} target="_blank" rel="noopener noreferrer">{tr('Download APK', 'Unduh APK')} <span aria-hidden="true">↓</span></a>
          : <button className="play-btn" type="button" disabled aria-describedby="android-download-note">{tr('Download APK', 'Unduh APK')}</button>}
        <small id="android-download-note" className="muted">{ANDROID_APK_URL ? tr('Opens the APK download in a new tab.', 'Membuka download APK di tab baru.') : tr('Coming soon', 'Segera hadir')}</small>
      </section>
    </div>
  </>
}
