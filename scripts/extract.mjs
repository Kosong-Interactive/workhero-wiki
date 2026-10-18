import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Read live Idle RPG tuning and catalogs, rather than the retired Career Idle ITEM catalogs.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const unity = resolve(process.argv[2] || resolve(root, '../Workhero'))
const gameplay = resolve(unity, 'Assets/Scripts/Gameplay/Game')
const assets = resolve(unity, 'Assets/ScriptableObjects')
const kit = resolve(unity, 'Assets/Art/UI/Kit/icons')
const officeIds = ['freelance', 'compas-news', 'farmhub', 'brexa']
const read = name => readFileSync(resolve(gameplay, name + '.cs'), 'utf8')
const code = source => source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')
const requireMatch = (source, regex) => {
  const match = source.match(regex)
  if (!match) throw new Error(`Source changed: could not extract ${regex}`)
  return match
}
const number = value => Number(value.replace(/[_dLf]/g, ''))
const constant = (source, key) => number(requireMatch(code(source), new RegExp(`\\b${key}\\s*=\\s*([\\d._]+[dLf]?)\\s*;`))[1])
const array = (source, key) => requireMatch(code(source), new RegExp(`\\b${key}\\s*=\\s*\\{([^}]+)\\}`))[1].split(',').map(v => number(v.trim()))
const icons = new Map()
const icon = name => {
  const filename = name.includes('/') ? `${name}.png` : `icon-${name}.png`
  const source = resolve(kit, filename)
  // Nested paths are flattened into the wiki's icon folder, while references stay stable.
  const dest = filename.split('/').at(-1)
  readFileSync(source) // fail on missing artwork instead of shipping an empty icon
  icons.set(dest, source)
  return `/icons/${dest}`
}

const tuning = Object.fromEntries([...code(read('GameTuning')).matchAll(/public (?:int|double) (\w+)\s*=\s*([\d._]+[d]?)\s*;/g)].map(m => [m[1], number(m[2])]))
if (Object.keys(tuning).length === 0) throw new Error('No game tuning fields found')
const tuningAsset = readFileSync(resolve(assets, 'Game/GameTuning.asset'), 'utf8')
for (const m of tuningAsset.matchAll(/^    (\w+): ([\d.e+-]+)$/gm)) {
  if (!(m[1] in tuning)) throw new Error(`Unknown tuning field: ${m[1]}`)
  tuning[m[1]] = Number(m[2])
}
const stats = [
  ['AutoLoc', 'Auto LoC', 'Auto LoC', 'Damage per second to a stage.', 'Damage per detik ke stage.', 'effect-auto-loc-flat'],
  ['CashPerTask', 'Cash per Task', 'Cash per Task', 'More Cash for each stage cleared.', 'Lebih banyak Cash tiap stage selesai.', 'stat-cash-per-task'],
  ['StressResistance', 'Stress Resistance', 'Ketahanan Stress', 'Slows the rate at which Stress rises.', 'Memperlambat kenaikan Stress.', 'effect-stress-resistance'],
  ['RecoverySpeed', 'Recovery Speed', 'Kecepatan Pemulihan', 'Shortens Recovery after the fixed Burnout lock.', 'Memperpendek Recovery setelah lock Burnout tetap.', 'effect-recovery-speed'],
  ['BossDamage', 'Boss Damage', 'Boss Damage', 'Extra damage against Releases and Major Releases.', 'Damage tambahan ke Release dan Major Release.', 'stat-boss-damage'],
  ['BossTimer', 'Timer', 'Timer', 'More time to finish any stage, including Tasks and bosses.', 'Lebih banyak waktu untuk menyelesaikan semua stage, termasuk Task dan boss.', 'stat-boss-timer'],
].map(([id, name, nameId, description, descriptionId, artwork]) => ({ id, name, nameId, description, descriptionId, icon: icon(artwork), baseCost: tuning[id + 'CostBase'], costGrowth: tuning[id + 'CostGrowth'] }))

const permanentSource = read('PermanentUpgrades')
const permanentNumbers = Object.fromEntries(['PoolPerLevel', 'HeadStartStagesPerLevel', 'StatCapPerLevel', 'BaseOfflineMinutes', 'OfflineMinutesPerLevel', 'OfflineMaxLevel'].map(k => [k, constant(permanentSource, k)]))
function permanentPrice(id) {
  const source = code(permanentSource)
  const block = id.startsWith('Global') ? requireMatch(source, /default:\s*([\s\S]*?)break;/)[1] : requireMatch(source, new RegExp(`case PermanentUpgrade\\.${id}:([\\s\\S]*?)break;`))[1]
  return { baseCost: constant(block, 'costBase'), costGrowth: constant(block, 'growth') }
}
const permanent = [
  ['GlobalAutoLoc', 'Global Auto LoC', 'Auto LoC Global', 'Adds to the global Auto LoC bonus pool.', 'Menambah pool bonus Auto LoC global.', 'effect-auto-loc-percent'],
  ['GlobalCashPerTask', 'Global Cash per Task', 'Cash per Task Global', 'Adds to the global Cash per Task bonus pool.', 'Menambah pool bonus Cash per Task global.', 'stat-cash-per-task'],
  ['HeadStart', 'Head Start', 'Head Start', 'Bank the Cash of early stage clears at the start of each run; the run still starts at stage 1.', 'Mulai setiap run dengan Cash senilai clear stage awal; run tetap mulai di stage 1.', 'retry'],
  ['StatLevelCap', 'Core Stat Level Cap', 'Batas Level Core Stat', 'Raises the maximum level of every Core Stat.', 'Menaikkan batas level semua Core Stat.', 'mission-stat'],
  ['OfflineHoursCap', 'Offline Hours Cap', 'Batas Waktu Offline', 'Extends the time credited while away.', 'Memperpanjang waktu yang dihitung saat offline.', 'clock'],
].map(([id, name, nameId, description, descriptionId, artwork]) => ({ id, name, nameId, description, descriptionId, icon: icon(artwork), ...permanentPrice(id), maxLevel: id === 'OfflineHoursCap' ? permanentNumbers.OfflineMaxLevel : null }))

const gearEffects = read('GearEffects')
const gearSales = array(read('GearSales'), 'ClearsByTier')
const tierNames = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
const percent = array(gearEffects, 'PercentByTier')
const reduction = array(gearEffects, 'ReductionByTier')
const bossTime = array(gearEffects, 'BossTimeByTier')
const gear = [
  ['LaptopSetup', 'Laptop Setup', 'Laptop Setup', 'Auto LoC', 'Auto LoC', 'laptop', percent, 1],
  ['Outfit', 'Outfit', 'Outfit', 'Cash per Task', 'Cash per Task', 'outfit', percent, 1],
  ['Chair', 'Chair', 'Kursi', 'Stress rate', 'Kenaikan Stress', 'chair', reduction, -1],
  ['Desk', 'Desk', 'Meja', 'All-stage time limit', 'Batas waktu semua stage', 'desk', bossTime, 1],
].map(([id, name, nameId, effect, effectId, artwork, bonuses, sign]) => ({ id, name, nameId, effect, effectId, icon: icon('gear-' + artwork), tiers: tierNames.map((tier, index) => ({ name: tier, bonus: Math.round(bonuses[index] * 10000) / 100 * sign, sellClears: gearSales[index], icon: icon(`gear/icon-gear-${artwork}-${tier.toLowerCase()}`) })) }))

const chestSource = read('Chests')
const odds = [...requireMatch(code(chestSource), /OddsByTier\s*=\s*\{([\s\S]*?)\};/)[1].matchAll(/new\[\]\s*\{([^}]+)\}/g)].map(m => m[1].split(',').map(Number))
if (odds.length !== tierNames.length || odds.some(row => row.length !== 5 || row.reduce((a, b) => a + b, 0) !== 100)) throw new Error('Invalid Package odds')
const packages = { cost: constant(chestSource, 'NormalCost'), meterSize: constant(chestSource, 'MeterSize'), tiers: tierNames.map((name, index) => ({ name, odds: odds[index], icon: icon('package/icon-package-' + name.toLowerCase()) })) }

const missionWords = {
  ClearTasks: ['Clear Tasks', 'Selesaikan Task', 'Lifetime patch-stage clears while playing, including farming. Offline clears do not count.', 'Total clear patch stage saat bermain, termasuk farming. Clear offline tidak dihitung.', 'mission-stat'],
  ClearReleases: ['Clear Releases', 'Selesaikan Release', 'Total Release mini-boss clears.', 'Total clear mini boss Release.', 'mission-boss'],
  ClearMajorReleases: ['Clear Major Releases', 'Selesaikan Major Release', 'Total Major Release boss clears.', 'Total clear boss Major Release.', 'mission-boss'],
  UpgradeStats: ['Upgrade Stats', 'Upgrade Stat', 'Lifetime Core Stat levels purchased.', 'Total level Core Stat yang dibeli sepanjang permainan.', 'mission-stat'],
  OwnFameUpgrades: ['Own Fame Upgrades', 'Miliki Upgrade Fame', 'Highest number of permanent upgrade levels held at once; refunds do not lower mission progress.', 'Jumlah level upgrade permanen terbanyak yang dimiliki sekaligus; refund tidak menurunkan progres misi.', 'fame-star'],
  BuySkins: ['Buy Offices', 'Beli Office', 'Purchased offices, excluding the free basic office.', 'Office yang dibeli, selain office dasar gratis.', 'shop-light'],
  BuyShopItems: ['Buy Shop Items', 'Beli Item Toko', 'Purchases of boosts and Common Packages.', 'Pembelian boost dan Package Common.', 'shop-light'],
  Ascend: ['Promote', 'Promote', 'Total times promoted.', 'Total Promote yang dilakukan.', 'retry'],
}
const missionSource = read('MissionCatalog')
const missionReward = constant(missionSource, 'StepECash')
const missions = [...code(missionSource).matchAll(/Add\(lines, MissionKind\.(\w+), new long\[\] \{([^}]+)\}\);/g)].map(m => {
  const [name, nameId, description, descriptionId, artwork] = missionWords[m[1]]
  const goals = m[2].split(',').map(v => number(v.trim()))
  if (goals.length === 0 || goals.some(goal => !Number.isFinite(goal) || goal <= 0)) throw new Error('Invalid mission goals')
  const allSteps = goals.map(goal => ({ goal, reward: missionReward }))
  // Future Office purchase targets would reveal the size of the unreleased catalog.
  const steps = m[1] === 'BuySkins' ? allSteps.filter(step => step.goal <= officeIds.length - 1) : allSteps
  return { id: m[1], name, nameId, description, descriptionId, icon: icon(artwork), steps, moreSteps: steps.length < allSteps.length }
})
if (missions.length !== 8) throw new Error('Mission catalog changed')

const boostsSource = read('ShopBoosts')
const shop = [
  ['Coffee', 'Coffee', 'Kopi', 'Stress drains to 0% at your Recovery rate, then stays calm while work continues. The fixed Burnout lock is unchanged.', 'Stress turun ke 0% sesuai kecepatan Recovery, lalu tetap tenang saat kerja berlanjut. Lock Burnout tetap berlaku.', 'coffee'],
  ['DoubleCash', 'Double Cash', 'Double Cash', 'Cash from stage clears ×2.', 'Cash dari clear stage ×2.', 'cash-banknote-green'],
  ['Overclock', 'Overclock', 'Overclock', 'Auto LoC damage ×2.', 'Damage Auto LoC ×2.', 'code-monitor'],
].map(([id, name, nameId, description, descriptionId, artwork]) => ({ id, name, nameId, description, descriptionId, icon: icon(artwork), cost: constant(boostsSource, 'Cost'), duration: constant(boostsSource, 'DurationSeconds') }))

const pricesSource = read('OfficePrices')
const officePricing = Object.fromEntries(['FirstSkinFame', 'PriceFactor', 'MultiplierFactor'].map(k => [k, constant(pricesSource, k)]))
// Only previously public offices are exported. No unreleased names or catalog count reach the browser.
const officeCatalog = [...readFileSync(resolve(assets, 'Game/Offices.asset'), 'utf8').matchAll(/^  - Id: (.+)\r?\n    DisplayName: (.+)$/gm)]
const offices = officeIds.map((id, index) => {
  const entry = officeCatalog.find(entry => entry[1].trim() === id)
  if (!entry || officeCatalog[index]?.[1].trim() !== id) throw new Error(`Public Office missing or reordered: ${id}`)
  const name = entry[2].trim()
  return { id, name, icon: icon('workplace-' + id), image: `/workplaces/${id}.png`, price: index === 0 ? 0 : Math.round(officePricing.FirstSkinFame * officePricing.PriceFactor ** (index - 1)), multiplier: officePricing.MultiplierFactor ** index }
})
const catSource = read('VisitingCat'), adSource = read('AdBoost'), bossSource = read('BossRewards')
const events = { catInterval: constant(catSource, 'IntervalSeconds'), catChance: constant(catSource, 'ECashChancePercent'), catReward: constant(catSource, 'ECashReward'), catCashClears: constant(catSource, 'CashClears'), releaseReward: constant(bossSource, 'Release'), majorReward: constant(bossSource, 'MajorRelease'), adLimit: constant(adSource, 'MaxAdsPerDay'), adDuration: constant(adSource, 'SecondsPerAd'), adMultiplier: constant(adSource, 'Multiplier'), daily: array(read('DailyCheckIn'), 'ECashDays') }
const currencyIcons = { cash: icon('cash-banknote-green'), ecash: icon('ecash-credit-card-blue'), fame: icon('fame-star'), code: icon('code'), stress: icon('stress-brain'), ascend: icon('retry'), bag: icon('bag'), missions: icon('missions'), daily: icon('daily-checkin') }
const output = { tuning, stats, permanent, permanentNumbers, gear, packages, missions, shop, offices, officePricing, events, icons: currencyIcons }
mkdirSync(resolve(root, 'src/data'), { recursive: true })
mkdirSync(resolve(root, 'public/icons'), { recursive: true })
writeFileSync(resolve(root, 'src/data/idle-rpg.json'), JSON.stringify(output, null, 2) + '\n')
for (const [filename, source] of icons) copyFileSync(source, resolve(root, 'public/icons', filename))
console.log(`Idle RPG: ${stats.length} Core Stats, ${permanent.length} Fame upgrades, ${gear.length} gear slots, ${packages.tiers.length} Package tiers, ${missions.length} mission lines, ${offices.length} public offices, ${icons.size} icons.`)
