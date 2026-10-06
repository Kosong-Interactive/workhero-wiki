import { LAUNCHED_WORKPLACES } from '../config'
import { useLang } from '../i18n'
import type { Workplace } from '../types'
import Icon from './Icon'

export const isComingSoon = (w: Workplace) => w.order > LAUNCHED_WORKPLACES

export default function WorkplaceImage({ w, size = 'card' }: { w: Workplace; size?: 'card' | 'big' }) {
  const { tr } = useLang()
  const className = 'wp-image' + (size === 'big' ? ' big' : '')
  if (isComingSoon(w)) {
    return (
      <div className={className + ' soon'}>
        <Icon src={w.icon} size={size === 'big' ? 72 : 48} alt={w.name} />
        <b>{tr('Coming soon', 'Segera hadir')}</b>
      </div>
    )
  }
  return (
    <div className={className}>
      <img src={w.image} alt={w.name} loading="lazy" onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')} />
    </div>
  )
}
