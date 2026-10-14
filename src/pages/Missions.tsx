import { useState } from 'react'
import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import Num from '../components/Num'
import Currency from '../components/Currency'
import NumberLegend from '../components/NumberLegend'

export default function Missions() {
  const { tr } = useLang()
  const [query, setQuery] = useState('')
  const lines = wiki.missions.filter(m => (m.name + ' ' + m.nameId + ' ' + m.description + ' ' + m.descriptionId).toLowerCase().includes(query.trim().toLowerCase()))
  return <>
    <h1>{tr('Missions', 'Misi')}</h1>
    <p className="lead">{tr('Eight lifetime mission lines. Each step pays ECash once and progress survives Ascension. Claim the current step to reveal the next.', 'Delapan rangkaian misi sepanjang permainan. Tiap langkah memberi ECash sekali dan progres bertahan setelah Ascension. Klaim langkah aktif untuk membuka langkah berikutnya.')}</p>
    <NumberLegend />
    <div className="filters"><label className="field">{tr('Search missions', 'Cari misi')}<input value={query} onChange={e => setQuery(e.target.value)} placeholder={tr('Name or description', 'Nama atau deskripsi')} /></label></div>
    {lines.length === 0 ? <p>{tr('No missions match.', 'Tidak ada misi yang cocok.')}</p> : lines.map(m => <section key={m.id}>
      <h2><Icon src={m.icon} size={28} /> {tr(m.name, m.nameId)}</h2><p className="muted">{tr(m.description, m.descriptionId)}</p>
      <div className="table-wrap"><table><thead><tr><th>{tr('Step', 'Langkah')}</th><th>{tr('Target', 'Target')}</th><th>{tr('Reward', 'Reward')}</th></tr></thead><tbody>{m.steps.map((s, i) => <tr key={s.goal}><td>{i + 1}</td><td><Num v={s.goal} /></td><td><Currency kind="ecash" value={s.reward} /></td></tr>)}</tbody></table></div>
      {m.moreSteps && <p className="muted">{tr('Further goals will be shown as new Offices are announced.', 'Target berikutnya akan ditampilkan saat Office baru diumumkan.')}</p>}
    </section>)}
  </>
}
