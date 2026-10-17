import { Link, useParams } from 'react-router-dom'
import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import Currency from '../components/Currency'
import Num from '../components/Num'
import ComingSoonCard from '../components/ComingSoonCard'
import NumberLegend from '../components/NumberLegend'

export default function Offices() {
  const { id } = useParams()
  const { tr } = useLang()
  const selected = id ? wiki.offices.find(s => s.id === id || String(wiki.offices.indexOf(s) + 1) === id) : undefined
  if (id && !selected) return <><h1>{tr('Office not found', 'Office tidak ditemukan')}</h1><Link to="/offices">{tr('Back to offices', 'Kembali ke office')}</Link></>
  return <>
    <h1>{selected ? selected.name : tr('Career offices', 'Office karier')}</h1>
    <p className="lead">{tr('Offices replace the old workplaces. Buy them with Current Fame and keep them forever. Only the equipped office’s Auto LoC and Cash per Task multipliers apply.', 'Office menggantikan tempat kerja lama. Beli dengan Current Fame dan miliki selamanya. Hanya multiplier Auto LoC dan Cash per Task office yang sedang dipakai yang aktif.')}</p>
    <div className="callout"><h2>{tr('Changing office triggers Promote', 'Mengganti office memicu Promote')}</h2><p>{tr('An office change pays the current run’s Fame and restarts the run. Cash, stage progress, Core Stat levels, and Stress reset; gear, Bag, ECash, Fame, missions, owned offices, and permanent upgrades stay.', 'Ganti office membayar Fame run saat ini lalu memulai run baru. Cash, progres stage, level Core Stat, dan Stress direset; gear, Bag, ECash, Fame, misi, office milikmu, dan upgrade permanen tetap.')}</p></div>
    <NumberLegend />
    <div className="card-grid">
      {(selected ? [selected] : wiki.offices).map(s => <Link className="wp-card" key={s.id} to={'/offices/' + s.id}>
        <div className="wp-image"><img src={s.image} alt={s.name} loading="lazy" /></div>
        <div className="wp-meta"><Icon src={s.icon} size={28} /><div><strong>{s.name}</strong><small>{s.price === 0 ? tr('Basic · free', 'Dasar · gratis') : <Currency kind="fame" value={s.price} />}</small><small>×<Num v={s.multiplier} /> Auto LoC · ×<Num v={s.multiplier} /> Cash per Task</small></div></div>
      </Link>)}
      {!selected && <ComingSoonCard />}
    </div>
    <p className="muted">{tr('Room images are reference previews from the earlier environment gallery. Per-office rooms and in-game office previews are still under development.', 'Gambar ruangan adalah referensi dari galeri environment sebelumnya. Ruangan per office dan preview office di game masih dikembangkan.')}</p>
    {selected ? <Link to="/offices">{tr('← All public offices', '← Semua office yang ditampilkan')}</Link> : <div className="table-wrap"><table><thead><tr><th>Office</th><th>{tr('Price (Fame)', 'Harga (Fame)')}</th><th>Auto LoC</th><th>Cash per Task</th></tr></thead><tbody>{wiki.offices.map(s => <tr key={s.id}><td>{s.name}</td><td>{s.price === 0 ? tr('Free', 'Gratis') : <Currency kind="fame" value={s.price} />}</td><td>×<Num v={s.multiplier} /></td><td>×<Num v={s.multiplier} /></td></tr>)}</tbody></table></div>}
  </>
}
