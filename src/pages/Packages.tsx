import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import Currency from '../components/Currency'
import Num from '../components/Num'

export default function Packages() {
  const { tr } = useLang()
  const p = wiki.packages
  return <>
    <h1>Packages</h1>
    <p className="lead">{tr('Buy a Common Package in the Shop, then open owned Packages from the Package panel. Each gives one gear piece from a random slot.', 'Beli Package Common di Toko, lalu buka Package yang dimiliki dari panel Package. Masing-masing memberi satu gear dari slot acak.')}</p>
    <div className="summary"><Icon src={p.tiers[0].icon} size={56} /><div><strong>{tr('Common Package', 'Package Common')}</strong><p className="muted"><Currency kind="ecash" value={p.cost} /> · {tr('Only Common can be purchased. Higher tiers come from the meter.', 'Hanya Common yang bisa dibeli. Tier lebih tinggi didapat dari meter.')}</p></div></div>
    <h2>{tr('Gear drop odds', 'Peluang drop gear')}</h2>
    <p className="muted">{tr('Each of the four slots has an equal 25% chance. The Package tier determines the gear tier using the odds below.', 'Keempat slot memiliki peluang sama, masing-masing 25%. Tier Package menentukan tier gear berdasarkan peluang berikut.')}</p>
    <div className="table-wrap"><table><thead><tr><th>{tr('Package tier', 'Tier Package')}</th>{p.tiers.map(t => <th key={t.name}>{t.name}</th>)}</tr></thead><tbody>{p.tiers.map(t => <tr key={t.name}><td><div className="with-icon"><Icon src={t.icon} size={44} /><strong>{t.name}</strong></div></td>{t.odds.map((odds, index) => <td key={index}>{odds ? odds + '%' : '—'}</td>)}</tr>)}</tbody></table></div>
    <h2>{tr('Free Package meter', 'Meter Package gratis')}</h2>
    <p>{tr('Each owned Package opened fills one of', 'Setiap Package milikmu yang dibuka mengisi satu dari')} <Num v={p.meterSize} /> {tr('places. Claim the reward when full; the next round offers the next tier. After Legendary, the cycle restarts.', 'slot meter. Klaim reward saat penuh; ronde berikutnya menawarkan tier selanjutnya. Setelah Legendary, siklus dimulai lagi.')}</p>
    <div className="flow">{tr('10 opens → Uncommon • 10 more → Rare • 10 more → Epic • 10 more → Legendary → repeat', '10 pembukaan → Uncommon • 10 lagi → Rare • 10 lagi → Epic • 10 lagi → Legendary → ulangi')}</div>
    <p className="muted">{tr('Opening any owned Package tier counts. A full meter waits for its reward to be claimed.', 'Membuka Package milikmu dari tier apa pun dihitung. Meter penuh menunggu reward diklaim.')}</p>
    <h2>{tr('Other gear rewards', 'Reward gear lainnya')}</h2>
    <ul className="bullets"><li>{tr('A free room Package gives one Common gear when you first clear each multiple of', 'Package gratis di ruangan memberi satu gear Common saat pertama kali menyelesaikan setiap kelipatan')} <Num v={wiki.tuning.PackageEveryStages} /> {tr('stages in a run.', 'stage dalam run.')}</li><li>{tr('Day 7 of check-in gives one Epic gear. These direct gear rewards do not fill the owned-Package meter.', 'Check-in hari ke-7 memberi satu gear Epic. Reward gear langsung ini tidak mengisi meter Package milikmu.')}</li></ul>
  </>
}
