import { wiki } from '../data'
import { useLang } from '../i18n'
import { effectId } from '../i18nData'
import Icon from '../components/Icon'

export default function Effects() {
  const { tr, lang } = useLang()
  return (
    <>
      <h1>{tr('Upgrade effects', 'Efek Upgrade')}</h1>
      <p className="lead">
        {tr(
          'Every upgrade item applies one of these effects. Each workplace names its items differently.',
          'Setiap item upgrade memakai salah satu efek ini. Tiap tempat kerja menamai itemnya berbeda.',
        )}
      </p>
      <div className="card-grid shop">
        {wiki.effects.map((e) => (
          <div key={e.name} className="shop-card">
            <Icon src={e.icon} size={48} alt={e.name} />
            <h3>{lang === 'id' ? effectId[e.name]?.name ?? e.name : e.name}</h3>
            <span className="badge">{e.kind === 'flat' ? tr('Flat', 'Tetap') : tr('Percent', 'Persen')}</span>
            <p>{lang === 'id' ? effectId[e.name]?.description ?? e.description : e.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
