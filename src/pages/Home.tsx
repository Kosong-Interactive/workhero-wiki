import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { PLAY_URL } from '../config'
import { useLang } from '../i18n'
import Icon from '../components/Icon'

export default function Home() {
  const { tr } = useLang()
  const items = wiki.workplaces.reduce((n, w) => n + w.items.length, 0)
  const milestones = wiki.workplaces.reduce((n, w) => n + w.milestones.length, 0)
  const stats: [string, number, string][] = [
    [tr('Workplaces', 'Tempat kerja'), wiki.workplaces.length, '/workplaces'],
    [tr('Upgrade items', 'Item upgrade'), items, '/workplaces'],
    [tr('Milestones', 'Milestone'), milestones, '/workplaces'],
    [tr('Server tiers', 'Tier server'), wiki.serverTiers.length, '/servers'],
    [tr('Shop items', 'Item toko'), wiki.shop.length, '/shop'],
  ]
  return (
    <>
      <h1>Workhero Wiki</h1>
      <p className="lead">
        {tr(
          'A reference for everything in WorkHero: Career Idle — workplaces, upgrade items, server tiers, shop consumables and milestones. Code writes itself, Users pay for it, and Stress builds until Burnout.',
          'Referensi lengkap isi WorkHero: Career Idle — tempat kerja, item upgrade, tier server, item toko, dan milestone. Kode ditulis otomatis, User membayarnya, dan Stress menumpuk sampai Burnout.',
        )}
      </p>
      <a className="play-btn big" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
        ▶ {tr('Play WorkHero: Career Idle', 'Main WorkHero: Career Idle')}
      </a>

      <div className="callout">
        <h2>{tr('What is LoC?', 'Apa itu LoC?')}</h2>
        <p>
          <strong>LoC = Lines of Code</strong>{' '}
          {tr(
            '— the number of lines of code you have written. It is the game’s core resource: your hero writes code automatically, every line is stored permanently in the Server, and the more code there is, the more Users it attracts.',
            '— jumlah baris kode yang sudah kamu tulis. Ini sumber daya inti game: hero menulis kode secara otomatis, setiap baris tersimpan permanen di Server, dan makin banyak kode makin banyak User yang tertarik.',
          )}
        </p>
        <ul className="bullets">
          <li><b>Auto LoC/s</b> — {tr('lines written per second, with no tapping needed.', 'baris yang ditulis per detik, tanpa perlu tap.')}</li>
          <li><b>Total LoC</b> — {tr('everything written so far. It never goes down.', 'semua yang sudah ditulis. Tidak pernah berkurang.')}</li>
          <li><b>Capacity</b> — {tr('how many lines the Server can hold. When it is full, writing stops until you buy a bigger Server.', 'banyaknya baris yang muat di Server. Kalau penuh, penulisan berhenti sampai kamu membeli Server yang lebih besar.')}</li>
        </ul>
        <Link to="/glossary">{tr('See the full glossary →', 'Lihat glosarium lengkap →')}</Link>
      </div>

      <div className="stat-row">
        {stats.map(([label, n, to]) => (
          <Link key={label} to={to} className="stat">
            <b>{n}</b>
            <span>{label}</span>
          </Link>
        ))}
      </div>
      <h2>{tr('The loop', 'Alur permainan')}</h2>
      <ol className="loop">
        <li>{tr('Automatic LoC/s grows permanent Total LoC in the Server.', 'Auto LoC/s menambah Total LoC permanen di Server.')}</li>
        <li>{tr('Users grow toward min(Total LoC × Users per LoC, Bandwidth).', 'User bertambah menuju min(Total LoC × User per LoC, Bandwidth).')}</li>
        <li>{tr('Users earn Cash continuously.', 'User menghasilkan Cash terus-menerus.')}</li>
        <li>{tr('Cash buys ITEM and SERVER upgrades.', 'Cash dipakai membeli upgrade ITEM dan SERVER.')}</li>
        <li>{tr('Milestones grant Fame and ECash, and unlock the next workplace.', 'Milestone memberi Fame dan ECash, serta membuka tempat kerja berikutnya.')}</li>
      </ol>
      <h2>{tr('Workplaces', 'Tempat kerja')}</h2>
      <div className="icon-strip">
        {wiki.workplaces.map((w) => (
          <Link key={w.id} to={`/workplaces/${w.id}`} title={w.name}>
            <Icon src={w.icon} size={40} alt={w.name} />
          </Link>
        ))}
      </div>
    </>
  )
}
