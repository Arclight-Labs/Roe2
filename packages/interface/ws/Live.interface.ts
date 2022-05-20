import { User } from "../db"
export interface Live {
  activeMatch: string
  prevMatches: string[]
  nextMatch: string
  schedule: Schedule[]
  invert: boolean
  activeTalents: Record<string, User>
  talents: Record<string, User>
  lt: Lowerthird
  shoutouts: Record<string, Shoutout>
}

/**
 * Adjustments
 *
 * 0 means it's disabled
 */
export interface AdjSize {
  h: number
  w: number
  x: number
  y: number
  scale: number
}

export interface AdjText {
  /*
	0 = disabled
   */
  size: number
  text: string
}

export interface AdjImage {
  URL: string
  BASE64?: string
  adj: AdjSize
}

export interface Schedule {
  matchId: string
  date: Date
}

// ======== Lowerthird
export interface Lowerthird {
  show: boolean
  data: LowerthirdData
  mode: LowerthirdMode
}

export interface LowerthirdData {
  ticker: Ticker
  ad: string
  adPool: AdPool
  matchPoll: MatchPoll
}

type LowerthirdMode = keyof LowerthirdData

export interface Ticker {
  headline: AdjText
  scrollerText: AdjText
}

export interface Ad {
  id: string
  headline: AdjText
  body: AdjText
  image: AdjImage
}

export interface AdWithPriority extends Ad {
  priority?: number
}

export interface AdPool {
  ads: AdWithPriority[]
  transitionDuration: number
  duration: number
}

export interface MatchPollItem {
  teamId: string
  vote: number
}

export interface MatchPoll {
  a: MatchPollItem
  b: MatchPollItem
}

export interface Shoutout {
  alias: string
  message: string
  image: string
  avatar: string
}

export interface Shoutout {
  name: string
  username: string
  text: string
  images: string[]
}
