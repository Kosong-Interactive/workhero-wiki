import { Link } from 'react-router-dom'

export default function PlayButton({ big = false, children }: { big?: boolean; children: React.ReactNode }) {
  return <Link className={'play-btn' + (big ? ' big' : '')} to="/play">{children}</Link>
}
