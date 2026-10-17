import { wiki } from '../data'
import { coreFormula, effectText, permanentEffect } from '../rpg'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import Num from '../components/Num'
import Currency from '../components/Currency'
import NumberLegend from '../components/NumberLegend'

export default function Upgrades() {
  const { tr } = useLang()
  const cap = wiki.tuning.BaseLevelCap
  return <>
    <h1>{tr('Upgrades', 'Upgrade')}</h1>
    <p className="lead">{tr('Cash buys six Core Stats for the current run. Current Fame buys permanent upgrades that survive Promote.', 'Cash membeli enam Core Stat untuk run saat ini. Current Fame membeli upgrade permanen yang bertahan setelah Promote.')}</p>
    <NumberLegend />
    <h2>Core Stats</h2>
    <p className="muted">{tr('L is the level owned. Values below are the stat’s own effect before offices, gear, Fame, and boosts. The initial cap is', 'L adalah level yang dimiliki. Nilai berikut adalah efek stat sendiri sebelum office, gear, Fame, dan boost. Batas level awal adalah')} <Num v={cap} />.</p>
    <div className="table-wrap"><table><thead><tr><th>{tr('Stat & description', 'Stat & deskripsi')}</th><th>{tr('Effect at level 1', 'Efek di level 1')}</th><th>{tr('Effect at initial cap', 'Efek di batas awal')}</th><th>{tr('First price', 'Harga pertama')}</th><th>{tr('Cost growth', 'Kenaikan biaya')}</th></tr></thead>
      <tbody>{wiki.stats.map(s => <tr key={s.id}><td><div className="with-icon"><Icon src={s.icon} size={32} /><strong>{tr(s.name, s.nameId)}</strong></div><small>{tr(s.description, s.descriptionId)}</small><code>{coreFormula(s.id)}</code></td><td>{effectText(s.id, 1)}</td><td>{effectText(s.id, cap)}</td><td><Currency kind="cash" value={s.baseCost} /></td><td>×{s.costGrowth}</td></tr>)}</tbody>
    </table></div>
    <p className="muted">{tr('Timer extends all stage limits, including ordinary Tasks. Desk adds its bonus to the same multiplier. Boss Damage only boosts damage against Releases and Major Releases.', 'Timer memperpanjang batas waktu semua stage, termasuk Task biasa. Desk menambahkan bonusnya ke multiplier yang sama. Boss Damage hanya meningkatkan damage ke Release dan Major Release.')}</p>
    <h2>{tr('Permanent Fame upgrades', 'Upgrade Fame permanen')}</h2>
    <p className="muted">{tr('Each level costs ceil(base × growth^L) Fame. Full refunds return Current Fame without changing Total Fame. Purchased offices cannot be refunded.', 'Tiap level berharga ceil(base × growth^L) Fame. Refund penuh mengembalikan Current Fame tanpa mengubah Total Fame. Office yang dibeli tidak bisa direfund.')}</p>
    <div className="table-wrap"><table><thead><tr><th>{tr('Upgrade', 'Upgrade')}</th><th>{tr('Level 1 effect', 'Efek level 1')}</th><th>{tr('First price', 'Harga pertama')}</th><th>{tr('Cost growth', 'Kenaikan biaya')}</th><th>{tr('Level cap', 'Batas level')}</th></tr></thead>
      <tbody>{wiki.permanent.map(u => <tr key={u.id}><td><div className="with-icon"><Icon src={u.icon} size={32} /><strong>{tr(u.name, u.nameId)}</strong></div><small>{tr(u.description, u.descriptionId)}</small></td><td>{permanentEffect(u.id, 1)}{u.id === 'HeadStart' ? ' ' + tr('stages of starting Cash', 'stage Cash awal') : ''}</td><td><Currency kind="fame" value={u.baseCost} /></td><td>×{u.costGrowth}</td><td>{u.maxLevel === null ? tr('No fixed cap', 'Tanpa batas tetap') : <Num v={u.maxLevel} />}</td></tr>)}</tbody>
    </table></div>
    <p className="muted">{tr('Head Start grants starting Cash; it does not skip stages. The Offline cap begins at 4 hours, rises by 6 minutes per level, and stops at 12 hours.', 'Head Start memberi Cash awal; tidak melewati stage. Batas offline mulai 4 jam, naik 6 menit tiap level, dan berhenti di 12 jam.')}</p>
  </>
}
