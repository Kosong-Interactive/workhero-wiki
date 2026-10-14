import { wiki, type CoreStat, type FameUpgrade } from './data'
import { compact } from './format'

const t = wiki.tuning
export function stageInfo(stage: number) {
  const perMajor = t.StepsPerRelease * t.ReleasesPerMajor
  const kind = stage % perMajor === 0 ? 'Major Release' : stage % t.StepsPerRelease === 0 ? 'Release' : 'Patch'
  const hpScale = kind === 'Major Release' ? t.MajorHpMultiplier : kind === 'Release' ? t.ReleaseHpMultiplier : 1
  const cashScale = kind === 'Major Release' ? t.MajorCashMultiplier : kind === 'Release' ? t.ReleaseCashMultiplier : 1
  return {
    kind,
    version: `v${Math.floor(stage / perMajor)}.${Math.floor((stage % perMajor) / t.StepsPerRelease)}.${stage % t.StepsPerRelease}`,
    hp: t.HpBase * t.HpGrowth ** (stage - 1) * hpScale,
    cash: t.CashBase * t.CashGrowth ** (stage - 1) * cashScale,
    time: kind === 'Major Release' ? t.MajorTimeLimitSeconds : kind === 'Release' ? t.ReleaseTimeLimitSeconds : t.PatchTimeLimitSeconds,
    ecash: kind === 'Major Release' ? wiki.events.majorReward : kind === 'Release' ? wiki.events.releaseReward : 0,
    fame: Math.floor((stage / t.FameStageScale) ** t.FameExponent),
  }
}
export function coreValue(id: string, level: number) {
  switch (id) {
    case 'AutoLoc': return (1 + level / t.AutoLocDivisor) ** t.AutoLocExponent
    case 'CashPerTask': return (1 + level / t.CashPerTaskDivisor) ** t.CashPerTaskExponent
    case 'StressResistance': return t.StressPerSecond / (1 + t.StressResistancePerLevel * level)
    case 'RecoverySpeed': return Math.max(t.RecoveryFloorSeconds, t.RecoveryBaseSeconds / (1 + t.RecoverySpeedPerLevel * level))
    case 'BossDamage': return 1 + t.BossDamagePerLevel * level
    case 'BossTimer': return 1 + t.BossTimerPerLevel * level
    default: throw new Error('Unknown Core Stat: ' + id)
  }
}
export function effectText(id: string, level: number) {
  const v = coreValue(id, level)
  return id === 'StressResistance' ? compact(v) + '%/s' : id === 'RecoverySpeed' ? compact(v) + 's' : '×' + compact(v)
}
export function nextCost(item: CoreStat | FameUpgrade, level: number, fame: boolean) {
  const value = item.baseCost * item.costGrowth ** level
  return fame ? Math.ceil(value - 1e-9) : value
}
export function permanentEffect(id: string, level: number) {
  const p = wiki.permanentNumbers
  switch (id) {
    case 'GlobalAutoLoc':
    case 'GlobalCashPerTask': return '+' + compact(p.PoolPerLevel * 100 * level) + '%'
    case 'HeadStart': return compact(p.HeadStartStagesPerLevel * level)
    case 'StatLevelCap': return compact(t.BaseLevelCap + p.StatCapPerLevel * level)
    case 'OfflineHoursCap': return compact((p.BaseOfflineMinutes + p.OfflineMinutesPerLevel * level) / 60) + 'h'
    default: throw new Error('Unknown Fame upgrade: ' + id)
  }
}
export function coreFormula(id: string) {
  switch (id) {
    case 'AutoLoc': return `(1 + L / ${t.AutoLocDivisor})^${t.AutoLocExponent}`
    case 'CashPerTask': return `(1 + L / ${t.CashPerTaskDivisor})^${t.CashPerTaskExponent}`
    case 'StressResistance': return `${t.StressPerSecond} / (1 + ${t.StressResistancePerLevel} × L)`
    case 'RecoverySpeed': return `max(${t.RecoveryFloorSeconds}, ${t.RecoveryBaseSeconds} / (1 + ${t.RecoverySpeedPerLevel} × L))`
    case 'BossDamage': return `1 + ${t.BossDamagePerLevel} × L`
    case 'BossTimer': return `1 + ${t.BossTimerPerLevel} × L`
    default: return ''
  }
}
export function clampInput(value: string, min: number, max: number) {
  const n = Number(value)
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.floor(n))) : min
}
