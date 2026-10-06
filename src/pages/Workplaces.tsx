import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import WorkplaceImage, { isComingSoon } from '../components/WorkplaceImage'

export default function Workplaces() {
  const { tr } = useLang()
  return (
    <>
      <h1>{tr('Workplaces', 'Tempat Kerja')}</h1>
      <p className="lead">{tr('Played in order. Each one finishes with a Milestone that unlocks the next.', 'Dimainkan berurutan. Tiap tempat kerja berakhir dengan Milestone yang membuka berikutnya.')}</p>
      <div className="card-grid">
        {wiki.workplaces.map((w) => (
          <Link key={w.id} to={`/workplaces/${w.id}`} className="wp-card">
            <WorkplaceImage w={w} />
            <div className="wp-meta">
              <Icon src={w.icon} size={28} />
              <div>
                <strong>
                  {w.order}. {w.name}
                </strong>
                <small>
                  {isComingSoon(w) ? '—' : `${w.items.length} ${tr('items', 'item')} · ${w.milestones.length} milestone`}
                </small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
