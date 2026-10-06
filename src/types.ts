export interface Item {
  id: string
  name: string
  description: string
  family: string
  effect: string
  effectIcon: string | null
  kind: 'flat' | 'percent'
  unit: string
  magnitudePerLevel: number
  maxLevel: number
  baseCost: number
  costGrowth: number
  unlockAtTotalLevels: number
}

export interface Milestone {
  id: string
  title: string
  description: string
  requiredCash: number
  fameReward: number
  ecashReward: number
  unlocksWorkplace: string | null
}

export interface Workplace {
  id: string
  name: string
  order: number
  icon: string | null
  image: string
  fameToUnlockNext: number
  baseAutoLocPerSecond: number
  usersPerLoc: number
  revenuePerUser: number
  stressPerSecond: number
  items: Item[]
  milestones: Milestone[]
}

export interface ServerTier {
  id: string
  name: string
  tier: number
  capacity: number
  bandwidth: number
  userGrowthPerSecond: number
  price: number
  icon: string | null
}

export interface ShopItem {
  name: string
  description: string
  badge: string
  costEcash: number
  durationSeconds: number
  icon: string | null
}

export interface Effect {
  name: string
  icon: string | null
  kind: string
  unit: string
  description: string
}

export type EventsConfig = Record<string, number>

export interface WikiData {
  events: EventsConfig
  workplaces: Workplace[]
  serverTiers: ServerTier[]
  shop: ShopItem[]
  effects: Effect[]
  icons: Record<string, string | null>
}
