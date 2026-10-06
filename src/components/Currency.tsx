import { wiki } from '../data'
import { compact, full } from '../format'
import Icon from './Icon'

export default function Currency({ kind, value }: { kind: 'cash' | 'ecash' | 'fame'; value: number }) {
  return (
    <span className="currency" title={full(value)}>
      <Icon src={wiki.icons[kind]} size={16} />
      {compact(value)}
    </span>
  )
}
