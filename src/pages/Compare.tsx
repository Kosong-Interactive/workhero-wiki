import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { compact, full } from '../format'
import { useLang } from '../i18n'
import Icon from '../components/Icon'

const maxCost = (i: { baseCost: number; costGrowth: number; maxLevel: number }) =>
  i.costGrowth === 1 ? i.baseCost * i.maxLevel : (i.baseCost * (Math.pow(i.costGrowth, i.maxLevel) - 1)) / (i.costGrowth - 1)

export default function Compare() {
  const { tr } = useLang()
  const rows = useMemo(
    () =>
      wiki.workplaces.map((w) => ({
        w,
        levels: w.items.reduce((n, i) => n + i.maxLevel, 0),
        itemCost: w.items.reduce((n, i) => n + maxCost(i), 0),
        fame: w.milestones.reduce((n, m) => n + m.fameReward, 0),
        ecash: w.milestones.reduce((n, m) => n + m.ecashReward, 0),
        finalCash: w.milestones[w.milestones.length - 1]?.requiredCash ?? 0,
      })),
    [],
  )
  const [sort, setSort] = useState<'order' | 'items' | 'itemCost' | 'finalCash' | 'fame'>('order')
  const sorted = [...rows].sort((a, b) => {
    if (sort === 'order') return a.w.order - b.w.order
    if (sort === 'items') return b.w.items.length - a.w.items.length
    if (sort === 'itemCost') return b.itemCost - a.itemCost
    if (sort === 'finalCash') return b.finalCash - a.finalCash
    return b.fame - a.fame
  })
  const th = (key: typeof sort, label: string) => (
    <th><button className={'sort' + (sort === key ? ' on' : '')} onClick={() => setSort(key)}>{label}</button></th>
  )
  return (
    <>
      <h1>{tr('Compare workplaces', 'Bandingkan Tempat Kerja')}</h1>
      <p className="lead">{tr('Click a column header to sort. "Cost to max everything" assumes every item is bought to its maximum level.', 'Klik header kolom untuk mengurutkan. "Biaya max semua" mengasumsikan setiap item dibeli sampai level maksimum.')}</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {th('order', tr('Workplace', 'Tempat kerja'))}
              <th>Auto LoC/s</th><th>User/LoC</th><th>{tr('Rev/User', 'Pend./User')}</th><th>Stress/s</th>
              {th('items', tr('Items', 'Item'))}<th>Level</th>
              {th('itemCost', tr('Cost to max everything', 'Biaya max semua'))}
              {th('finalCash', tr('Final milestone (cash)', 'Milestone akhir (cash)'))}
              {th('fame', 'Fame')}<th>ECash</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(({ w, levels, itemCost, fame, ecash, finalCash }) => (
              <tr key={w.id}>
                <td><Link to={`/workplaces/${w.id}`} className="with-icon"><Icon src={w.icon} size={22} /> {w.order}. {w.name}</Link></td>
                <td>{w.baseAutoLocPerSecond}</td><td>{w.usersPerLoc}</td><td>{w.revenuePerUser}</td><td>{w.stressPerSecond}%</td>
                <td>{w.items.length}</td><td>{levels}</td>
                <td title={full(itemCost)}>{compact(itemCost)}</td>
                <td title={full(finalCash)}>{compact(finalCash)}</td>
                <td>{full(fame)}</td><td>{ecash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
