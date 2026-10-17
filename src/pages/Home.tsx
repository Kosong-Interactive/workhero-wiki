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
    ['/calculator', 'Calculator', 'Kalkulator', wiki.icons.fame, 'Compare upgrade prices, stage HP, and Promote rewards.', 'Bandingkan biaya upgrade, HP stage, dan reward Promote.'],
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
      <div className="flow">{tr('Auto LoC damage → stage cleared → Cash → Core Stats → deeper versions → Promote → Fame', 'Damage Auto LoC → stage selesai → Cash → Core Stat → versi lebih tinggi → Promote → Fame')}</div>
      <div className="callout">
        <h2>{tr('What is LoC?', 'Apa itu LoC?')}</h2>
        <p><strong>LoC = Lines of Code</strong> — {tr('lines of code. In this game, Auto LoC/s is your damage per second: it reduces a task’s remaining HP. Cash is paid when the task is finished.', 'baris kode. Di game ini, Auto LoC/s adalah damage per detik: mengurangi HP task yang tersisa. Cash dibayar saat task selesai.')}</p>
        <Link to="/mechanics">{tr('Learn the new game loop →', 'Pelajari alur game baru →')}</Link>
      </div>
      <section>
          <h2>{tr('Your first run', 'Run pertamamu')}</h2>
          <ol className="bullets">
            <li>{tr('Let Auto LoC finish Tasks and earn Cash. Open Upgrade and buy your first Auto LoC level.', 'Biarkan Auto LoC menyelesaikan Task dan menghasilkan Cash. Buka Upgrade dan beli level Auto LoC pertamamu.')}</li>
            <li>{tr('Open Missions and claim completed goals. Each step pays', 'Buka Missions dan klaim target yang selesai. Setiap langkah memberi')} {wiki.missions[0].steps[0].reward} ECash. {tr('Two claims fund your first Common Package.', 'Dua klaim cukup untuk Package Common pertamamu.')}</li>
            <li>{tr('Buy a Common Package in Shop for', 'Beli Package Common di Shop seharga')} {wiki.packages.cost} ECash, {tr('open it from the Package panel, then go to Bag → choose the gear → Equip. New gear is not equipped automatically.', 'buka dari panel Package, lalu masuk Bag → pilih gear → Equip. Gear baru tidak dipakai otomatis.')}</li>
            <li>{tr('If a stage times out, upgrade while farming and press Next when ready to try moving forward again.', 'Jika waktu stage habis, beli upgrade sambil farming lalu tekan Next saat siap mencoba maju lagi.')}</li>
          </ol>
          <p className="muted">{tr('The in-game guide starts with a Welcome card and highlights these first steps. Skip Tips dismisses the guide; Settings → Replay Tips lets you see it again.', 'Panduan dalam game dimulai dengan kartu Welcome dan menyorot langkah awal ini. Skip Tips menutup panduan; Settings → Replay Tips menampilkannya lagi.')}</p>
      </section>
      <div className="card-grid shop guide-grid">
        {links.map(([to, en, id, icon, desc, descId]) => (
          <Link className="shop-card guide-card" to={to} key={to}><Icon src={icon} size={40} /><h3>{tr(en, id)}</h3><p>{tr(desc, descId)}</p></Link>
        ))}
      </div>
      <h2>{tr('Career offices', 'Office karier')}</h2>
      <p className="muted">{tr('Former workplaces are now offices. Their bonuses apply only while equipped; changing office triggers Promote.', 'Tempat kerja kini menjadi office. Bonusnya hanya aktif saat dipakai; mengganti office memicu Promote.')}</p>
      <div className="icon-strip">{wiki.offices.map(s => <Link key={s.id} to={'/offices/' + s.id} className="strip-item"><Icon src={s.icon} size={40} /><small>{s.name}</small></Link>)}<ComingSoonCard compact /></div>
      <h2>{tr('Reading big numbers', 'Membaca angka besar')}</h2>
      <NumberLegend />
    </>
  )
}
