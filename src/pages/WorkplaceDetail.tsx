import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { wiki, workplaceById } from '../data'
import { compact, full, perLevel } from '../format'
import { useLang } from '../i18n'
import { effectId, familyKey } from '../i18nData'
import Icon from '../components/Icon'
import Currency from '../components/Currency'
import Num from '../components/Num'
import NumberLegend from '../components/NumberLegend'
import WorkplaceImage, { isComingSoon, workplacePath } from '../components/WorkplaceImage'

export default function WorkplaceDetail() {
  const { tr, lang } = useLang()
  const { id = '' } = useParams()
  const wp = workplaceById(id) ?? wiki.workplaces.find((w) => String(w.order) === id)
  const [family, setFamily] = useState('All')
  const [query, setQuery] = useState('')

  const families = useMemo(() => ['All', ...Array.from(new Set(wp?.items.map((i) => i.family) ?? []))], [wp])
  if (!wp || isComingSoon(wp)) return <p>{tr('Workplace not found.', 'Tempat kerja tidak ditemukan.')} <Link to="/workplaces">{tr('Back to workplaces', 'Kembali')}</Link></p>

  const q = query.trim().toLowerCase()
  const items = wp.items.filter(
    (i) =>
      (family === 'All' || i.family === family) &&
      (!q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.effect.toLowerCase().includes(q)),
  )
  const prev = wiki.workplaces[wp.order - 2]
  const candidate = wiki.workplaces[wp.order]
  const next = candidate && !isComingSoon(candidate) ? candidate : undefined

  return (
    <>
      <p className="crumbs"><Link to="/workplaces">{tr('Workplaces', 'Tempat Kerja')}</Link> / {wp.name}</p>
      <div className="wp-hero">
        <WorkplaceImage w={wp} size="big" />
        <div>
          <h1><Icon src={wp.icon} size={36} /> {wp.name}</h1>
          <dl className="facts">
            <dt>{tr('Order', 'Urutan')}</dt><dd>#{wp.order}</dd>
            <dt>Base Auto LoC/s</dt><dd><Num v={wp.baseAutoLocPerSecond} /></dd>
            <dt>{tr('Users per LoC', 'User per LoC')}</dt><dd><Num v={wp.usersPerLoc} /></dd>
            <dt>{tr('Revenue per User', 'Pendapatan per User')}</dt><dd><Num v={wp.revenuePerUser} /></dd>
            <dt>{tr('Stress per second', 'Stress per detik')}</dt><dd>{wp.stressPerSecond}%</dd>
            <dt>{tr('Fame to unlock next', 'Fame untuk membuka berikutnya')}</dt><dd><Num v={wp.fameToUnlockNext} /></dd>
          </dl>
        </div>
      </div>

      <>
      <NumberLegend />
      <h2>Milestone ({wp.milestones.length})</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Milestone</th><th>{tr('Cash earned', 'Cash terkumpul')}</th><th>Fame</th><th>ECash</th><th>{tr('Unlocks', 'Membuka')}</th></tr>
          </thead>
          <tbody>
            {wp.milestones.map((m) => (
              <tr key={m.id}>
                <td><strong>{m.title}</strong><small>{m.description}</small></td>
                <td><Currency kind="cash" value={m.requiredCash} /></td>
                <td><Currency kind="fame" value={m.fameReward} /></td>
                <td><Currency kind="ecash" value={m.ecashReward} /></td>
                <td>{m.unlocksWorkplace ? (() => {
                  const target = wiki.workplaces.find((w) => w.id === m.unlocksWorkplace)
                  if (!target) return m.unlocksWorkplace
                  return isComingSoon(target)
                    ? tr('Coming soon', 'Segera hadir')
                    : <Link to={workplacePath(target)}>{target.name}</Link>
                })() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{tr('Upgrade items', 'Item upgrade')} ({wp.items.length})</h2>
      <div className="filters">
        <input placeholder={tr('Search name, description or effect…', 'Cari nama, deskripsi, atau efek…')} value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="chips">
          {families.map((f) => (
            <button key={f} className={f === family ? 'on' : ''} onClick={() => setFamily(f)}>{f === 'All' ? tr('All', 'Semua') : lang === 'id' ? familyKey(f) : f}</button>
          ))}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th></th><th>Item</th><th>{tr('Effect per level', 'Efek per level')}</th><th>{tr('Max level', 'Level maks')}</th><th>{tr('Base cost', 'Biaya dasar')}</th><th>{tr('Cost growth', 'Kenaikan biaya')}</th><th>{tr('Unlocks at', 'Terbuka di')}</th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td><Icon src={i.effectIcon} size={28} alt={i.effect} /></td>
                <td><strong>{i.name}</strong><small>{i.description}</small><small className="tag">{lang === 'id' ? familyKey(i.family) : i.family}</small></td>
                <td>{perLevel(i.kind, i.magnitudePerLevel, i.unit)}<small>{lang === 'id' ? effectId[i.effect]?.name ?? i.effect : i.effect}</small></td>
                <td>{i.maxLevel}</td>
                <td><Currency kind="cash" value={i.baseCost} /></td>
                <td>×{i.costGrowth}</td>
                <td title={full(i.unlockAtTotalLevels)}>{i.unlockAtTotalLevels === 0 ? tr('Start', 'Awal') : `${compact(i.unlockAtTotalLevels)} level`}</td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={7} className="empty">{tr('No items match.', 'Tidak ada item yang cocok.')}</td></tr>}
          </tbody>
        </table>
      </div>
      </>

      <div className="pager">
        {prev ? <Link to={workplacePath(prev)}>← {prev.name}</Link> : <span />}
        {next ? <Link to={workplacePath(next)}>{next.name} →</Link> : <span />}
      </div>
    </>
  )
}
