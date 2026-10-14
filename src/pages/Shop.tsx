import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import Currency from '../components/Currency'

export default function Shop() {
  const { tr } = useLang()
  return <>
    <h1>{tr('Shop', 'Toko')}</h1>
    <p className="lead">{tr('Spend ECash on timed boosts and Common Packages. Spend Current Fame on offices and permanent upgrades.', 'Belanjakan ECash untuk boost sementara dan Package Common. Gunakan Current Fame untuk office dan upgrade permanen.')}</p>
    <h2>{tr('Timed boosts', 'Boost sementara')}</h2>
    <div className="card-grid shop">{wiki.shop.map(s => <div key={s.id} className="shop-card"><Icon src={s.icon} size={56} /><h3>{tr(s.name, s.nameId)}</h3><span className="badge">{s.duration}s</span><p>{tr(s.description, s.descriptionId)}</p><Currency kind="ecash" value={s.cost} /></div>)}</div>
    <p className="muted">{tr('Buying the same boost again extends its time; its strength does not stack. Boost timers continue while away and the buffs survive Ascension.', 'Membeli boost yang sama lagi memperpanjang durasi; kekuatannya tidak bertumpuk. Timer boost terus berjalan saat offline dan buff bertahan setelah Ascension.')}</p>
    <h2>Package</h2>
    <div className="summary"><Icon src={wiki.packages.tiers[0].icon} size={56} /><div><strong>{tr('Common Package', 'Package Common')}</strong><p className="muted"><Currency kind="ecash" value={wiki.packages.cost} /> · {tr('Adds one owned Common Package, opened separately for a random gear piece.', 'Menambah satu Package Common milikmu, dibuka terpisah untuk gear acak.')}</p><Link to="/packages">{tr('See all Package odds →', 'Lihat semua peluang Package →')}</Link></div></div>
    <h2>{tr('Fame purchases', 'Pembelian Fame')}</h2>
    <div className="card-grid shop"><Link className="shop-card guide-card" to="/offices"><h3>{tr('Offices', 'Office')}</h3><p>{tr('Career looks with equipped-only Auto LoC and Cash per Task multipliers. Changing office triggers Ascension.', 'Tampilan karier dengan multiplier Auto LoC dan Cash per Task saat dipakai. Ganti office memicu Ascension.')}</p></Link><Link className="shop-card guide-card" to="/upgrades"><h3>{tr('Permanent upgrades', 'Upgrade permanen')}</h3><p>{tr('Global bonuses, Head Start, Core Stat level cap, and offline time. Fully refundable.', 'Bonus global, Head Start, batas level Core Stat, dan waktu offline. Bisa direfund penuh.')}</p></Link></div>
  </>
}
