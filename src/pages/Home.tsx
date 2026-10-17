import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { useLang } from '../i18n'
import PlayButton from '../components/PlayButton'
import NumberLegend from '../components/NumberLegend'
import Icon from '../components/Icon'
import ComingSoonCard from '../components/ComingSoonCard'

export default function Home() {
  const { tr } = useLang()
  const links = [
    ['/upgrades', 'Core Stats & Fame', 'Core Stat & Fame', wiki.icons.code, 'Build your run with Cash, then buy permanent upgrades with Fame.', 'Bangun run dengan Cash, lalu beli upgrade permanen dengan Fame.'],
    ['/gear', 'Gear & Bag', 'Gear & Bag', wiki.icons.bag, 'Four slots, five tiers. Equip, merge, or sell spare gear.', 'Empat slot, lima tier. Pakai, merge, atau jual gear cadangan.'],
    ['/packages', 'Packages', 'Package', wiki.packages.tiers[0].icon, 'Open gear Packages and earn free higher-tier Packages.', 'Buka Package gear dan dapatkan Package gratis dengan tier lebih tinggi.'],
    ['/missions', 'Missions', 'Misi', wiki.icons.missions, 'Lifetime goals pay ECash once per step.', 'Target sepanjang permainan memberi ECash sekali tiap langkah.'],
    ['/offices', 'Offices', 'Office', wiki.offices[0].icon, 'Choose a career look with Auto LoC and Cash bonuses.', 'Pilih tampilan karier dengan bonus Auto LoC dan Cash.'],
    ['/calculator', 'Calculator', 'Kalkulator', wiki.icons.fame, 'Compare upgrade prices, stage HP, and Ascension rewards.', 'Bandingkan biaya upgrade, HP stage, dan reward Ascension.'],
  ]
  return (
    <>
      <div className="hero-intro">
        <div>
          <h1>Build. Release. Repeat.</h1>
          <p className="lead">{tr('The guide to WorkHero’s new idle RPG loop. Write code automatically, clear tasks and bosses, collect gear, and turn each run into permanent Fame.', 'Panduan mekanik idle RPG baru WorkHero. Tulis kode otomatis, selesaikan task dan boss, kumpulkan gear, lalu ubah hasil setiap run menjadi Fame permanen.')}</p>
          <PlayButton big>▶ {tr('Play WorkHero', 'Main WorkHero')}</PlayButton>
        </div>
        <img className="hero-art" src="/og-image.jpg" alt={tr('WorkHero developer coding at a home desk', 'Developer WorkHero coding di meja rumah')} />
      </div>
      <div className="flow">{tr('Auto LoC damage → stage cleared → Cash → Core Stats → deeper versions → Ascension → Fame', 'Damage Auto LoC → stage selesai → Cash → Core Stat → versi lebih tinggi → Ascension → Fame')}</div>
      <div className="callout">
        <h2>{tr('What is LoC?', 'Apa itu LoC?')}</h2>
        <p><strong>LoC = Lines of Code</strong> — {tr('lines of code. In this game, Auto LoC/s is your damage per second: it reduces a task’s remaining HP. Cash is paid when the task is finished.', 'baris kode. Di game ini, Auto LoC/s adalah damage per detik: mengurangi HP task yang tersisa. Cash dibayar saat task selesai.')}</p>
        <Link to="/mechanics">{tr('Learn the new game loop →', 'Pelajari alur game baru →')}</Link>
      </div>
      <div className="card-grid shop guide-grid">
        {links.map(([to, en, id, icon, desc, descId]) => (
          <Link className="shop-card guide-card" to={to} key={to}><Icon src={icon} size={40} /><h3>{tr(en, id)}</h3><p>{tr(desc, descId)}</p></Link>
        ))}
      </div>
      <h2>{tr('Career offices', 'Office karier')}</h2>
      <p className="muted">{tr('Former workplaces are now offices. Their bonuses apply only while equipped; changing office starts an Ascension.', 'Tempat kerja kini menjadi office. Bonusnya hanya aktif saat dipakai; mengganti office memicu Ascension.')}</p>
      <div className="icon-strip">{wiki.offices.map(s => <Link key={s.id} to={'/offices/' + s.id} className="strip-item"><Icon src={s.icon} size={40} /><small>{s.name}</small></Link>)}<ComingSoonCard compact /></div>
      <h2>{tr('Reading big numbers', 'Membaca angka besar')}</h2>
      <NumberLegend />
    </>
  )
}
