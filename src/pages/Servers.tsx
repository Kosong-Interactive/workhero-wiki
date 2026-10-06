import { wiki } from '../data'
import { compact, full } from '../format'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import NumberLegend from '../components/NumberLegend'
import Currency from '../components/Currency'

export default function Servers() {
  const { tr } = useLang()
  return (
    <>
      <h1>{tr('Server tiers', 'Tier Server')}</h1>
      <p className="lead">
        {tr(
          'One ladder shared by every workplace. A tier raises LoC Capacity, Bandwidth and User Growth/s together — only the SERVER tab can raise Capacity.',
          'Satu tangga yang sama untuk semua tempat kerja. Satu tier menaikkan Capacity LoC, Bandwidth, dan User Growth/s sekaligus — hanya tab SERVER yang bisa menaikkan Capacity.',
        )}
      </p>
      <NumberLegend />
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th></th><th>Tier</th><th>Capacity (LoC)</th><th>Bandwidth (User)</th><th>User Growth/s</th><th>{tr('Price', 'Harga')}</th></tr>
          </thead>
          <tbody>
            {wiki.serverTiers.map((t) => (
              <tr key={t.id}>
                <td><Icon src={t.icon} size={32} alt={t.name} /></td>
                <td><strong>{t.tier}. {t.name}</strong></td>
                <td title={full(t.capacity)}>{compact(t.capacity)}</td>
                <td title={full(t.bandwidth)}>{compact(t.bandwidth)}</td>
                <td title={full(t.userGrowthPerSecond)}>{compact(t.userGrowthPerSecond)}</td>
                <td>{t.price === 0 ? tr('Free', 'Gratis') : <Currency kind="cash" value={t.price} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
