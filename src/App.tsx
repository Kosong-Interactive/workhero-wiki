import { NavLink, Route, Routes } from 'react-router-dom'
import { PLAY_URL } from './config'
import { useLang } from './i18n'
import Home from './pages/Home'
import Workplaces from './pages/Workplaces'
import WorkplaceDetail from './pages/WorkplaceDetail'
import Servers from './pages/Servers'
import Shop from './pages/Shop'
import Effects from './pages/Effects'
import Calculator from './pages/Calculator'
import Compare from './pages/Compare'
import Economy from './pages/Economy'
import Mechanics from './pages/Mechanics'
import Glossary from './pages/Glossary'

export default function App() {
  const { lang, setLang, tr } = useLang()
  const links: [string, string][] = [
    ['/', tr('Home', 'Beranda')],
    ['/glossary', tr('Glossary', 'Glosarium')],
    ['/workplaces', tr('Workplaces', 'Tempat Kerja')],
    ['/servers', 'Server'],
    ['/shop', tr('Shop', 'Toko')],
    ['/effects', tr('Effects', 'Efek')],
    ['/calculator', tr('Calculator', 'Kalkulator')],
    ['/compare', tr('Compare', 'Bandingkan')],
    ['/economy', tr('Currencies', 'Mata Uang')],
    ['/mechanics', tr('How it works', 'Cara Kerja')],
  ]
  return (
    <>
      <header className="topbar">
        <NavLink to="/" className="brand">
          <img src="/workhero-logo.png" alt="WorkHero" />
          <span>Wiki</span>
        </NavLink>
        <nav>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="lang" role="group" aria-label="Language">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'id' ? 'on' : ''} onClick={() => setLang('id')}>ID</button>
        </div>
        <a className="play-btn" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
          ▶ {tr('Play', 'Main')}
        </a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/workplaces" element={<Workplaces />} />
          <Route path="/workplaces/:id" element={<WorkplaceDetail />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/effects" element={<Effects />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/mechanics" element={<Mechanics />} />
        </Routes>
      </main>
    </>
  )
}
