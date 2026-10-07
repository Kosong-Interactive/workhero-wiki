import { Link } from 'react-router-dom'
import { wiki } from '../data'
import { useLang } from '../i18n'
import Icon from '../components/Icon'
import WorkplaceImage, { isComingSoon, workplacePath } from '../components/WorkplaceImage'
import ComingSoonCard from '../components/ComingSoonCard'

export default function Workplaces() {
  const { tr } = useLang()
  return (
    <>
      <h1>{tr('Workplaces', 'Tempat Kerja')}</h1>
      <p className="lead">{tr('Played in order. Each one finishes with a Milestone that unlocks the next.', 'Dimainkan berurutan. Tiap tempat kerja berakhir dengan Milestone yang membuka berikutnya.')}</p>
      <div className="card-grid">
        {wiki.workplaces.filter((w) => !isComingSoon(w)).map((w) => (
          <Link key={w.id} to={workplacePath(w)} className="wp-card">
            <WorkplaceImage w={w} />
            <div className="wp-meta">
              <Icon src={w.icon} size={28} />
              <div>
                <strong>
                  {w.order}. {w.name}
                </strong>
                <small>
                  {w.items.length} {tr('items', 'item')} · {w.milestones.length} milestone
                </small>
              </div>
            </div>
          </Link>
        ))}
        <ComingSoonCard />
      </div>
    </>
  )
}
