import raw from './data/wiki.json'
import type { WikiData } from './types'

export const wiki = raw as unknown as WikiData

export const workplaceById = (id: string) => wiki.workplaces.find((w) => w.id === id)
