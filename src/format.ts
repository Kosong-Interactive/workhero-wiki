/** Same suffixes as the game's HUD (CompactNumber.cs), short-scale names. */
export const NUMBER_SUFFIXES: { suffix: string; power: number; en: string; id: string }[] = [
  { suffix: 'K', power: 3, en: 'thousand', id: 'ribu' },
  { suffix: 'M', power: 6, en: 'million', id: 'juta' },
  { suffix: 'B', power: 9, en: 'billion', id: 'miliar' },
  { suffix: 'T', power: 12, en: 'trillion', id: 'triliun' },
  { suffix: 'Qa', power: 15, en: 'quadrillion', id: 'kuadriliun' },
  { suffix: 'Qi', power: 18, en: 'quintillion', id: 'kuintiliun' },
  { suffix: 'Sx', power: 21, en: 'sextillion', id: 'sekstiliun' },
  { suffix: 'Sp', power: 24, en: 'septillion', id: 'septiliun' },
  { suffix: 'Oc', power: 27, en: 'octillion', id: 'oktiliun' },
  { suffix: 'No', power: 30, en: 'nonillion', id: 'noniliun' },
  { suffix: 'Dc', power: 33, en: 'decillion', id: 'desiliun' },
]

export function compact(n: number): string {
  if (n < 1000) return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, '')
  const tier = Math.min(Math.floor(Math.log10(n) / 3), NUMBER_SUFFIXES.length)
  const scaled = n / Math.pow(1000, tier)
  const text = scaled >= 100 ? scaled.toFixed(0) : scaled >= 10 ? scaled.toFixed(1) : scaled.toFixed(2)
  return text.replace(/\.?0+$/, '') + NUMBER_SUFFIXES[tier - 1].suffix
}

export function full(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

export function perLevel(kind: 'flat' | 'percent', magnitude: number, unit: string): string {
  return kind === 'flat' ? `+${compact(magnitude)} ${unit}` : `+${magnitude}%`
}
