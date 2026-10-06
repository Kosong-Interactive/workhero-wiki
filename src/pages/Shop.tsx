import { wiki } from '../data'
import { useLang } from '../i18n'
import { shopId } from '../i18nData'
import Icon from '../components/Icon'
import Currency from '../components/Currency'

export default function Shop() {
  const { tr, lang } = useLang()
  return (
    <>
      <h1>{tr('Shop', 'Toko')}</h1>
      <p className="lead">
        {tr(
          'One-minute consumables bought with ECash. They never raise a permanent rate — Kopi answers Burnout, Bonus Sprint boosts Cash, Overclock boosts production.',
          'Item sekali pakai selama satu menit yang dibeli dengan ECash. Tidak pernah menaikkan rate permanen — Kopi mengatasi Burnout, Bonus Sprint menaikkan Cash, Overclock menaikkan produksi.',
        )}
      </p>
      <div className="card-grid shop">
        {wiki.shop.map((s) => (
          <div key={s.name} className="shop-card">
            <Icon src={s.icon} size={56} alt={s.name} />
            <h3>{s.name}</h3>
            <span className="badge">{lang === 'id' ? shopId[s.name]?.badge ?? s.badge : s.badge}</span>
            <p>{lang === 'id' ? shopId[s.name]?.description ?? s.description : s.description}</p>
            <Currency kind="ecash" value={s.costEcash} />
          </div>
        ))}
      </div>
    </>
  )
}
