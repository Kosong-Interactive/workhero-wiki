import { useState } from 'react'
import { wiki } from '../data'
import { clampInput, coreValue, effectText, nextCost, permanentEffect, stageInfo, stageTimeLimit } from '../rpg'
import { useLang } from '../i18n'
import Num from '../components/Num'
import Currency from '../components/Currency'
import NumberLegend from '../components/NumberLegend'

export default function Calculator() {
  const { tr } = useLang()
  const [category, setCategory] = useState('core')
  const [itemId, setItemId] = useState('AutoLoc')
  const [from, setFrom] = useState(0)
  const [target, setTarget] = useState(10)
  const [capLevels, setCapLevels] = useState(0)
  const [stage, setStage] = useState(10)
  const [officeId, setOfficeId] = useState(wiki.offices[0].id)
  const [autoLevel, setAutoLevel] = useState(0)
  const [cashLevel, setCashLevel] = useState(0)
  const [bossDamage, setBossDamage] = useState(0)
  const [bossTimer, setBossTimer] = useState(0)
  const [globalAuto, setGlobalAuto] = useState(0)
  const [globalCash, setGlobalCash] = useState(0)
  const fame = category === 'fame'
  const list = fame ? wiki.permanent : wiki.stats
  const item = list.find(i => i.id === itemId) ?? list[0]
  const statCap = wiki.tuning.BaseLevelCap + wiki.permanentNumbers.StatCapPerLevel * capLevels
  const max = fame ? (wiki.permanent.find(u => u.id === item.id)?.maxLevel ?? 2000) : statCap
  const start = Math.min(from, max)
  const end = Math.min(Math.max(start, target), max)
  const rows = Array.from({ length: Math.min(100, end - start) }, (_, i) => {
    const level = start + i + 1
    return { level, cost: nextCost(item, level - 1, fame) }
  })
  const total = Array.from({ length: end - start }, (_, i) => nextCost(item, start + i, fame)).reduce((a, b) => a + b, 0)
  const office = wiki.offices.find(s => s.id === officeId) ?? wiki.offices[0]
  const s = stageInfo(stage)
  const baseDamage = wiki.tuning.BaseAutoLocPerSecond * office.multiplier * coreValue('AutoLoc', Math.min(autoLevel, statCap)) * (1 + wiki.permanentNumbers.PoolPerLevel * globalAuto)
  const damage = baseDamage * (s.kind === 'Patch' ? 1 : coreValue('BossDamage', Math.min(bossDamage, statCap)))
  const cash = s.cash * office.multiplier * coreValue('CashPerTask', Math.min(cashLevel, statCap)) * (1 + wiki.permanentNumbers.PoolPerLevel * globalCash)
  const time = stageTimeLimit(stage, Math.min(bossTimer, statCap))
  const setCategoryAndItem = (value: string) => {
    setCategory(value); setItemId(value === 'fame' ? wiki.permanent[0].id : wiki.stats[0].id); setFrom(0); setTarget(10)
  }
  return <>
    <h1>{tr('Calculator', 'Kalkulator')}</h1>
    <p className="lead">{tr('Use current game tuning to plan upgrades and inspect stages. These are reference calculations, not a simulation of an entire run.', 'Gunakan tuning game terkini untuk merencanakan upgrade dan melihat stage. Ini perhitungan referensi, bukan simulasi satu run penuh.')}</p>
    <NumberLegend />
    <h2>{tr('Upgrade costs', 'Biaya upgrade')}</h2>
    <div className="calc-fields">
      <label className="field">{tr('Currency / category', 'Mata uang / kategori')}<select value={category} onChange={e => setCategoryAndItem(e.target.value)}><option value="core">Cash · Core Stats</option><option value="fame">Fame · {tr('Permanent', 'Permanen')}</option></select></label>
      <label className="field">{tr('Upgrade', 'Upgrade')}<select value={item.id} onChange={e => { setItemId(e.target.value); setFrom(0); setTarget(10) }}>{list.map(i => <option key={i.id} value={i.id}>{tr(i.name, i.nameId)}</option>)}</select></label>
      <label className="field">{tr('Owned level', 'Level dimiliki')}<input type="number" min={0} max={max} value={start} onChange={e => setFrom(clampInput(e.target.value, 0, max))} /></label>
      <label className="field">{tr('Target level', 'Level tujuan')}<input type="number" min={start} max={max} value={end} onChange={e => setTarget(clampInput(e.target.value, start, max))} /></label>
      <label className="field">{tr('Fame level-cap upgrade level', 'Level upgrade batas Core Stat')}<input type="number" min={0} max={90} value={capLevels} onChange={e => setCapLevels(clampInput(e.target.value, 0, 90))} /></label>
    </div>
    <p className="muted">{tr('Core Stat cap:', 'Batas Core Stat:')} <Num v={statCap} /> · {tr('First purchase uses the base price. Core prices = base × growth^owned level. Fame prices round up. Uncapped Fame calculations support target levels up to 2K.', 'Pembelian pertama memakai harga dasar. Harga Core = base × growth^level dimiliki. Harga Fame dibulatkan ke atas. Perhitungan Fame tanpa batas mendukung target sampai level 2K.')}</p>
    <div className="summary"><div><strong>{tr(item.name, item.nameId)} · {tr('Level', 'Level')} <Num v={start} /> → <Num v={end} /></strong><p>{tr('Cost for this range:', 'Biaya untuk rentang ini:')} <Currency kind={fame ? 'fame' : 'cash'} value={total} /></p></div></div>
    <div className="table-wrap"><table><thead><tr><th>{tr('Level bought', 'Level dibeli')}</th><th>{tr('Price', 'Harga')}</th><th>{tr('Effect at that level', 'Efek di level tersebut')}</th></tr></thead><tbody>{rows.map(r => <tr key={r.level}><td><Num v={r.level} /></td><td><Currency kind={fame ? 'fame' : 'cash'} value={r.cost} /></td><td>{fame ? permanentEffect(item.id, r.level) : effectText(item.id, r.level)}{fame && item.id === 'HeadStart' ? ' ' + tr('stages of starting Cash', 'stage Cash awal') : ''}</td></tr>)}{rows.length === 0 && <tr><td colSpan={3}>{tr('Choose a higher target level to see prices.', 'Pilih level tujuan lebih tinggi untuk melihat harga.')}</td></tr>}</tbody></table></div>
    {end - start > 100 && <p className="muted">{tr('The table shows the first 100 purchases; the total includes the full selected range.', 'Tabel menampilkan 100 pembelian pertama; total menghitung seluruh rentang yang dipilih.')}</p>}
    <h2>{tr('Stage & Promote', 'Stage & Promote')}</h2>
    <div className="calc-fields">
      <label className="field">{tr('Stage (1–10K)', 'Stage (1–10K)')}<input type="number" min={1} max={10000} value={stage} onChange={e => setStage(clampInput(e.target.value, 1, 10000))} /></label>
      <label className="field">Office<select value={officeId} onChange={e => setOfficeId(e.target.value)}>{wiki.offices.map(office => <option key={office.id} value={office.id}>{office.name}</option>)}</select></label>
      <label className="field">Auto LoC L<input type="number" min={0} max={statCap} value={Math.min(autoLevel, statCap)} onChange={e => setAutoLevel(clampInput(e.target.value, 0, statCap))} /></label>
      <label className="field">Cash per Task L<input type="number" min={0} max={statCap} value={Math.min(cashLevel, statCap)} onChange={e => setCashLevel(clampInput(e.target.value, 0, statCap))} /></label>
      <label className="field">Boss Damage L<input type="number" min={0} max={statCap} value={Math.min(bossDamage, statCap)} onChange={e => setBossDamage(clampInput(e.target.value, 0, statCap))} /></label>
      <label className="field">Timer L<input type="number" min={0} max={statCap} value={Math.min(bossTimer, statCap)} onChange={e => setBossTimer(clampInput(e.target.value, 0, statCap))} /></label>
      <label className="field">{tr('Global Auto LoC L', 'Auto LoC Global L')}<input type="number" min={0} max={2000} value={globalAuto} onChange={e => setGlobalAuto(clampInput(e.target.value, 0, 2000))} /></label>
      <label className="field">{tr('Global Cash per Task L', 'Cash per Task Global L')}<input type="number" min={0} max={2000} value={globalCash} onChange={e => setGlobalCash(clampInput(e.target.value, 0, 2000))} /></label>
    </div>
    <p className="muted">{tr('Timer extends every stage’s time limit. Boss Damage applies only to Releases and Major Releases.', 'Timer memperpanjang batas waktu semua stage. Boss Damage hanya berlaku pada Release dan Major Release.')}</p>
    <div className="summary"><strong>{s.version} · {s.kind}</strong></div>
    <dl className="facts stage-facts">
      <dt>HP</dt><dd><Num v={s.hp} /></dd>
      <dt>{tr('Damage/s', 'Damage/detik')}</dt><dd><Num v={damage} /></dd>
      <dt>{tr('Cash per clear', 'Cash tiap clear')}</dt><dd><Currency kind="cash" value={cash} /></dd>
      <dt>{tr('Time limit', 'Batas waktu')}</dt><dd><Num v={time} />s</dd>
      <dt>{tr('Ideal clear time', 'Waktu clear ideal')}</dt><dd><Num v={s.hp / damage} />s</dd>
      <dt>{tr('First-clear ECash', 'ECash clear pertama')}</dt><dd><Currency kind="ecash" value={s.ecash} /></dd>
      <dt>{tr('Fame if best reached', 'Fame jika ini stage tertinggi')}</dt><dd><Currency kind="fame" value={s.fame} /></dd>
    </dl>
    <p className="muted">{tr('The stage ceiling here is a calculator input limit, not the game’s last stage. Ideal clear time assumes uninterrupted coding: gear, boosts, Stress, Burnout, retreats, and offline farming are excluded.', 'Batas stage di sini adalah batas input kalkulator, bukan stage terakhir game. Waktu clear ideal mengasumsikan coding tanpa henti: gear, boost, Stress, Burnout, mundur, dan farming offline tidak dihitung.')}</p>
  </>
}
