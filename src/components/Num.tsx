import { compact, full } from '../format'

/** A number in the game's K/M/B/T… notation; hover shows the exact value. */
export default function Num({ v }: { v: number }) {
  return <span title={full(v)}>{compact(v)}</span>
}
