import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { useLang } from '../i18n'
import { duration } from '../format'
import Icon from '../components/Icon'
import Currency from '../components/Currency'

export default function Shop() {
  const { tr } = useLang()
  return <>
    <h1>{tr('Shop', 'Toko')}</h1>
    <p className="lead">{tr('Spend ECash on boost items and Common Packages. Spend Current Fame on offices and permanent upgrades.', 'Belanjakan ECash untuk item boost dan Package Common. Gunakan Current Fame untuk office dan upgrade permanen.')}</p>
    <h2>{tr('Boost items', 'Item boost')}</h2>
    <p>{tr('Four boosts, each sold in five sizes shown as the gear tiers. A purchase goes into Bag → Items and is not used straight away: press USE there when you want it. Using one adds its time to that boost; a running boost is extended, never stacked.', 'Empat boost, masing-masing dijual dalam lima ukuran yang ditandai seperti tier gear. Item yang dibeli masuk ke Bag → Items dan tidak langsung terpakai: tekan USE di sana saat kamu mau. Memakai item menambah durasi boost itu; boost yang sedang berjalan diperpanjang, tidak ditumpuk.')}</p>
    {wiki.shop.map(boost => <section key={boost.id}>
      <h3><Icon src={boost.icon} size={28} /> {tr(boost.name, boost.nameId)}</h3>
      <p className="muted">{tr(boost.description, boost.descriptionId)}</p>
      <div className="card-grid shop">{boost.sizes.map(size => <div key={size.tier} className="shop-card">
        <Icon src={size.icon} size={56} /><h3>{size.name}</h3>
        <span className={'badge tier-' + size.tier.toLowerCase()}>{size.tier} · {duration(size.duration)}</span>
        <p>{size.description}</p><Currency kind="ecash" value={size.cost} />
      </div>)}</div>
    </section>)}
    <p className="muted">{tr('Boost timers run on real time, offline too, and survive Promote. Each item bought counts as one Shop purchase for the Buy Shop Items missions, whatever its size. A Large project can also pay a 1 h boost item.', 'Timer boost berjalan dengan waktu nyata, termasuk saat offline, dan bertahan setelah Promote. Setiap item yang dibeli dihitung satu pembelian Toko untuk misi Beli Item Toko, berapa pun ukurannya. Project Large juga bisa memberi item boost 1 jam.')} <Link to="/projects">{tr('See Projects →', 'Lihat Projects →')}</Link></p>
    <h2>Package</h2>
    <div className="summary"><Icon src={wiki.packages.tiers[0].icon} size={56} /><div><strong>{tr('Common Package', 'Package Common')}</strong><p className="muted">x1 <Currency kind="ecash" value={wiki.packages.cost} /> · x{wiki.packages.tenPack.count} <Currency kind="ecash" value={wiki.packages.tenPack.cost} /> · {tr('Adds owned Common Packages, each opened separately for a random gear piece. Each Package bought counts as one Shop purchase.', 'Menambah Package Common milikmu, masing-masing dibuka terpisah untuk gear acak. Setiap Package yang dibeli dihitung satu pembelian Toko.')}</p><Link to="/packages">{tr('See all Package odds →', 'Lihat semua peluang Package →')}</Link></div></div>
    <h2>{tr('Fame purchases', 'Pembelian Fame')}</h2>
    <div className="card-grid shop"><Link className="shop-card guide-card" to="/offices"><h3>{tr('Offices', 'Office')}</h3><p>{tr('Career looks with equipped-only Auto LoC and Cash per Task multipliers. Changing office triggers Promote.', 'Tampilan karier dengan multiplier Auto LoC dan Cash per Task saat dipakai. Ganti office memicu Promote.')}</p></Link><Link className="shop-card guide-card" to="/upgrades"><h3>{tr('Permanent upgrades', 'Upgrade permanen')}</h3><p>{tr('Global bonuses, Head Start, Core Stat level cap, and offline time. Fully refundable.', 'Bonus global, Head Start, batas level Core Stat, dan waktu offline. Bisa direfund penuh.')}</p></Link></div>
  </>
}
