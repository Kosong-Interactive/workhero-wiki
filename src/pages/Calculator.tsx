import { useMemo, useState } from 'react'
import { wiki, workplaceById } from '../data'
import { compact, full, perLevel } from '../format'
import { useLang } from '../i18n'
import { effectId } from '../i18nData'
import Icon from '../components/Icon'
import NumberLegend from '../components/NumberLegend'
import { isComingSoon } from '../components/WorkplaceImage'

export default function Calculator() {
  const { tr, lang } = useLang()
  const [wpId, setWpId] = useState(wiki.workplaces[0].id)
  const wp = workplaceById(wpId)!
  const [itemId, setItemId] = useState(wp.items[0].id)
  const item = wp.items.find((i) => i.id === itemId) ?? wp.items[0]
  const [from, setFrom] = useState(0)

  const rows = useMemo(() => {
    let total = 0
    return Array.from({ length: item.maxLevel }, (_, n) => {
      const cost = item.baseCost * Math.pow(item.costGrowth, n)
      total += cost
      return { level: n + 1, cost, total, effect: (n + 1) * item.magnitudePerLevel }
    })
  }, [item])

  const start = Math.min(from, item.maxLevel)
  const remaining = rows.slice(start).reduce((s, r) => s + r.cost, 0)

  const changeWorkplace = (id: string) => {
    setWpId(id)
    setItemId(workplaceById(id)!.items[0].id)
    setFrom(0)
  }

  return (
    <>
      <h1>{tr('Cost calculator', 'Kalkulator Biaya')}</h1>
      <p className="lead">
        {tr('Level n costs', 'Level n berharga')} <code>base × growth^(n−1)</code>
        {tr(', so the first purchase is the base cost. Pick an item to see the price of every level.', ', jadi pembelian pertama seharga base cost. Pilih item untuk melihat harga tiap level.')}
      </p>
      <div className="filters">
        <select value={wpId} onChange={(e) => changeWorkplace(e.target.value)}>
          {wiki.workplaces.filter((w) => !isComingSoon(w)).map((w) => <option key={w.id} value={w.id}>{w.order}. {w.name}</option>)}
        </select>
        <select value={item.id} onChange={(e) => { setItemId(e.target.value); setFrom(0) }}>
          {wp.items.map((i) => <option key={i.id} value={i.id}>{i.name} — {i.effect}</option>)}
        </select>
        <label className="inline">
          {tr('Already own level', 'Sudah punya level')}
          <input type="number" min={0} max={item.maxLevel} value={from} onChange={(e) => setFrom(Math.max(0, Number(e.target.value) || 0))} />
        </label>
      </div>
      <NumberLegend />
      <div className="summary">
        <Icon src={item.effectIcon} size={36} alt={item.effect} />
        <div>
          <strong>{item.name}</strong> <span className="muted">· {lang === 'id' ? effectId[item.effect]?.name ?? item.effect : item.effect} · {perLevel(item.kind, item.magnitudePerLevel, item.unit)} {tr('per level', 'per level')}</span>
          <div className="muted">{tr('Cost to max from level', 'Biaya sampai max dari level')} {start}: <b title={full(remaining)}>{compact(remaining)}</b> Cash</div>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Level</th><th>{tr('Cost', 'Biaya')}</th><th>{tr('Cumulative', 'Kumulatif')}</th><th>{tr('Total effect', 'Total efek')}</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.level} className={r.level <= start ? 'owned' : ''}>
                <td>{r.level}</td>
                <td title={full(r.cost)}>{compact(r.cost)}</td>
                <td title={full(r.total)}>{compact(r.total)}</td>
                <td>{item.kind === 'flat' ? `+${compact(r.effect)} ${item.unit}` : `+${r.effect}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
