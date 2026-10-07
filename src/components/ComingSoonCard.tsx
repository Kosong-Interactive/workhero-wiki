import { useLang } from '../i18n'

/** The only hint that more workplaces exist: one card, no count, no names. */
export default function ComingSoonCard({ compact = false }: { compact?: boolean }) {
  const { tr } = useLang()
  const text = tr('More workplaces are under development', 'Tempat kerja lainnya sedang dikembangkan')
  if (compact) {
    return (
      <div className="strip-item soon more" title={text}>
        <span className="more-mark">?</span>
        <small>{tr('Coming soon', 'Segera hadir')}</small>
      </div>
    )
  }
  return (
    <div className="wp-card more">
      <div className="wp-image soon">
        <span className="more-mark big">?</span>
        <b>{tr('Coming soon', 'Segera hadir')}</b>
      </div>
      <div className="wp-meta">
        <small>{text}</small>
      </div>
    </div>
  )
}
