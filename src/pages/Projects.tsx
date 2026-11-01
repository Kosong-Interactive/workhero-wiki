import { wiki } from '../data'
import { useLang } from '../i18n'
import { duration } from '../format'
import Icon from '../components/Icon'
import Currency from '../components/Currency'

export default function Projects() {
  const { tr } = useLang()
  const p = wiki.projects
  const itemName = (tier: string) => wiki.shop.map(boost => boost.sizes.find(size => size.tier === tier)?.name).join(' / ')
  return <>
    <h1>Projects</h1>
    <p className="lead">{tr('Side jobs taken on beside the main work. The board offers three projects, one per size; pick one and finish its goal before its time runs out for ECash or a boost item.', 'Kerja sampingan di luar pekerjaan utama. Papan menawarkan tiga project, satu per ukuran; pilih satu dan selesaikan targetnya sebelum waktunya habis untuk mendapat ECash atau item boost.')}</p>
    <h2>{tr('How it works', 'Cara kerja')}</h2>
    <ul className="bullets">
      <li>{tr('Only one project runs at a time. Starting one rolls a new offer of the same size in its place.', 'Hanya satu project yang berjalan dalam satu waktu. Memulai project mengacak penawaran baru dengan ukuran yang sama di tempatnya.')}</li>
      <li>{tr('The time limit runs on real time, also while the game is closed.', 'Batas waktu berjalan dengan waktu nyata, juga saat game ditutup.')}</li>
      <li>{tr('A finished project never expires: its reward waits for CLAIM, even days later. A project that is not finished when its time runs out is dropped with no penalty.', 'Project yang sudah selesai tidak pernah hangus: reward menunggu CLAIM, bahkan beberapa hari kemudian. Project yang belum selesai saat waktunya habis dibuang tanpa penalti.')}</li>
      <li>{tr('DROP abandons the running project (a second tap confirms).', 'DROP membatalkan project yang berjalan (tap kedua untuk konfirmasi).')}</li>
      <li>{tr('Each offer shows its reward before you start: either ECash or one boost item, never both. Rewards are rolled with the offer and do not change on reload.', 'Setiap penawaran menunjukkan reward sebelum dimulai: ECash atau satu item boost, tidak keduanya. Reward diacak bersama penawaran dan tidak berubah saat reload.')}</li>
      <li>{tr('REROLL replaces all three offers:', 'REROLL mengganti ketiga penawaran:')} {p.freeRerolls} {tr('free a day, then', 'gratis per hari, lalu')} {p.adRerolls} {tr('more by watching an ad. They reset on a new local day.', 'lagi dengan menonton iklan. Direset pada hari lokal baru.')}</li>
      <li>{tr('The Projects button shows a dot while a project is finished or none is running.', 'Tombol Projects menampilkan titik saat ada project selesai atau tidak ada yang berjalan.')}</li>
    </ul>
    <h2>{tr('Goals', 'Target')}</h2>
    <div className="table-wrap"><table><thead><tr><th>Project</th><th>{tr('Goal', 'Target')}</th>{p.sizes.map(size => <th key={size.name}>{size.name} · {duration(size.minutes * 60)}</th>)}<th>{tr('Counts offline', 'Dihitung offline')}</th></tr></thead>
      <tbody>{p.goals.map(goal => <tr key={goal.id}><td><Icon src={goal.icon} size={24} /> {goal.name}</td><td>{tr(goal.goal, goal.goalId)}</td>{goal.targets.map((target, i) => <td key={i}>{target}</td>)}<td>{goal.countsOffline ? tr('Yes', 'Ya') : tr('No', 'Tidak')}</td></tr>)}</tbody></table></div>
    <p className="muted">{tr('Only Bugfix Sprint progresses while away: Tasks cleared offline count for the part of the absence before the time limit. Offline play never fights a boss or buys stats, so Ship It and Refactor only progress while you play and usually run out if you leave.', 'Hanya Bugfix Sprint yang berjalan saat ditinggal: Task yang diselesaikan offline dihitung untuk bagian waktu sebelum batasnya habis. Mode offline tidak pernah melawan boss atau membeli stat, jadi Ship It dan Refactor hanya maju saat bermain dan biasanya hangus jika ditinggal.')}</p>
    <h2>{tr('Rewards', 'Reward')}</h2>
    <p>{tr('About', 'Sekitar')} {p.itemChance}% {tr('of offers pay a boost item of a random family; the rest pay ECash.', 'penawaran memberi item boost dari jenis acak; sisanya memberi ECash.')}</p>
    <div className="table-wrap"><table><thead><tr><th>{tr('Size', 'Ukuran')}</th><th>{tr('Time limit', 'Batas waktu')}</th><th>ECash</th><th>{tr('or boost item', 'atau item boost')}</th></tr></thead>
      <tbody>{p.sizes.map(size => <tr key={size.name}><td>{size.name}</td><td>{duration(size.minutes * 60)}</td><td><Currency kind="ecash" value={size.minECash} />–<Currency kind="ecash" value={size.maxECash} /></td><td><span className={'tier-' + size.itemTier.toLowerCase()}>{size.itemTier}</span> · {duration(size.itemDuration)} ({itemName(size.itemTier)})</td></tr>)}</tbody></table></div>
    <p className="muted">{tr('Projects repeat and have no daily cap, unlike Missions, which pay once per step. A boost item reward goes into Bag → Items, ready to USE.', 'Projects bisa diulang dan tidak punya batas harian, berbeda dengan Misi yang hanya memberi sekali per langkah. Reward item boost masuk ke Bag → Items, siap di-USE.')}</p>
  </>
}
