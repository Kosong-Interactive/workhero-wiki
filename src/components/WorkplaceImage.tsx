import { LAUNCHED_WORKPLACES } from '../config'
import { useLang } from '../i18n'
import type { Workplace } from '../types'
import Icon from './Icon'

export const isComingSoon = (w: Workplace) => w.order > LAUNCHED_WORKPLACES

/** Unreleased workplaces keep their name secret: the data stays complete, only the display is hidden. */
export const displayName = (w: Workplace) => (isComingSoon(w) ? '???' : w.name)

/** Unreleased workplaces link by order number, so the URL does not spell the name either. */
export const workplacePath = (w: Workplace) => `/workplaces/${isComingSoon(w) ? w.order : w.id}`

export default function WorkplaceImage({ w, size = 'card' }: { w: Workplace; size?: 'card' | 'big' }) {
  const { tr } = useLang()
  const className = 'wp-image' + (size === 'big' ? ' big' : '')
  if (isComingSoon(w)) {
    return (
      <div className={className + ' soon'}>
        <Icon src={w.icon} size={size === 'big' ? 72 : 48} alt={displayName(w)} />
        <b>{tr('Coming soon', 'Segera hadir')}</b>
      </div>
    )
  }
  return (
    <div className={className}>
      <img src={w.image} alt={displayName(w)} loading="lazy" onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')} />
    </div>
  )
}
