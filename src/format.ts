const SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc']

export function compact(n: number): string {
  if (n < 1000) return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, '')
  const tier = Math.min(Math.floor(Math.log10(n) / 3), SUFFIXES.length - 1)
  const scaled = n / Math.pow(1000, tier)
  const text = scaled >= 100 ? scaled.toFixed(0) : scaled >= 10 ? scaled.toFixed(1) : scaled.toFixed(2)
  return text.replace(/\.?0+$/, '') + SUFFIXES[tier]
}

export function full(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

export function perLevel(kind: 'flat' | 'percent', magnitude: number, unit: string): string {
  return kind === 'flat' ? `+${magnitude} ${unit}` : `+${magnitude}%`
}
