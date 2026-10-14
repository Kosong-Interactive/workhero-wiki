import raw from './data/idle-rpg.json'

export const wiki = raw
export type CoreStat = typeof wiki.stats[number]
export type FameUpgrade = typeof wiki.permanent[number]
export type Office = typeof wiki.offices[number]
