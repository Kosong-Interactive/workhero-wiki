import { useLang } from '../i18n'

/** One teaser for future offices, with no unreleased names or catalog count. */
export default function ComingSoonCard({ compact = false }: { compact?: boolean }) {
  const { tr } = useLang()
  const text = tr('More career offices are under development', 'Office karier lainnya sedang dikembangkan')
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
