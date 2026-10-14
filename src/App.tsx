import { useEffect } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import PlayButton from './components/PlayButton'
import { useLang } from './i18n'
import Home from './pages/Home'
import Offices from './pages/Offices'
import Shop from './pages/Shop'
import Upgrades from './pages/Upgrades'
import Gear from './pages/Gear'
import Packages from './pages/Packages'
import Missions from './pages/Missions'
import Calculator from './pages/Calculator'
import Economy from './pages/Economy'
import Mechanics from './pages/Mechanics'
import Glossary from './pages/Glossary'

function LegacyOffice() {
  const { id } = useParams()
  return <Navigate to={'/offices/' + encodeURIComponent(id ?? '')} replace />
}
export default function App() {
  const { lang, setLang, tr } = useLang()
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  const links: [string, string][] = [
    ['/', tr('Home', 'Beranda')],
    ['/mechanics', tr('How it works', 'Cara kerja')],
    ['/upgrades', tr('Upgrades', 'Upgrade')],
    ['/gear', 'Gear & Bag'],
    ['/packages', 'Package'],
    ['/missions', tr('Missions', 'Misi')],
    ['/offices', tr('Offices', 'Office')],
    ['/shop', tr('Shop', 'Toko')],
    ['/calculator', tr('Calculator', 'Kalkulator')],
    ['/economy', tr('Currencies', 'Mata uang')],
    ['/glossary', tr('Glossary', 'Glosarium')],
  ]
  return <>
    <header className="topbar">
      <NavLink to="/" className="brand"><img src="/workhero-title.png" alt="WorkHero" /><span>Wiki</span></NavLink>
      <nav aria-label={tr('Wiki navigation', 'Navigasi wiki')}>{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
      <div className="lang" role="group" aria-label={tr('Language', 'Bahasa')}>
        <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
        <button className={lang === 'id' ? 'on' : ''} onClick={() => setLang('id')} aria-pressed={lang === 'id'}>ID</button>
      </div>
      <PlayButton>▶ {tr('Play', 'Main')}</PlayButton>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mechanics" element={<Mechanics />} />
        <Route path="/upgrades" element={<Upgrades />} />
        <Route path="/gear" element={<Gear />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/offices" element={<Offices />} />
        <Route path="/offices/:id" element={<Offices />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/economy" element={<Economy />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/skins" element={<Navigate to="/offices" replace />} />
        <Route path="/skins/:id" element={<LegacyOffice />} />
        <Route path="/workplaces" element={<Navigate to="/offices" replace />} />
        <Route path="/workplaces/:id" element={<LegacyOffice />} />
        <Route path="/servers" element={<Navigate to="/mechanics" replace />} />
        <Route path="/effects" element={<Navigate to="/upgrades" replace />} />
        <Route path="/compare" element={<Navigate to="/offices" replace />} />
        <Route path="*" element={<><h1>{tr('Page not found', 'Halaman tidak ditemukan')}</h1><NavLink to="/">{tr('Back to Home', 'Kembali ke Beranda')}</NavLink></>} />
      </Routes>
    </main>
    <footer className="wiki-footer"><span>WorkHero: Idle RPG</span><p>{tr('Prototype mechanics · balance values may change during development.', 'Mekanik prototipe · angka balance bisa berubah selama pengembangan.')}</p></footer>
  </>
}
