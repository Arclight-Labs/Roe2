import type { User } from "interface"
import { CoinFlip, Veto, VetoSettings } from "interface/db"
import type { SanitizedParticipant, SanitizedSeries } from "interface/waypoint"
import type { Broadcast, Live, Lowerthird } from "interface/ws"

import type {
  Ad,
  AdjImage,
  AdjSize,
  AdjText,
  AdPool,
  MatchPoll,
  MatchPollItem,
  Ticker,
} from "interface/ws/Live.interface"
import { VetoMode, VetoSequenceSettingsItem } from "../schema/veto.schema"

export const defaultVetoSettingsSequenceItem: VetoSequenceSettingsItem = {
  action: "ban",
  mode: null,
  mapActor: "loser",
  sideActor: "winner",
}

export const defaultVetoMode: VetoMode = {
  id: "",
  imageUrl: "",
  mapPool: [],
  name: "",
}
export const defaultVetoSettings: VetoSettings = {
  type: "standard",
  sequence: [],
  mapPool: [],
  modes: [],
  timer: null,
  autoStart: true,
}

export const defaultCoinFlip: CoinFlip = {
  heads: null,
  loser: null,
  result: null,
  tails: null,
  winner: null,
}

export const defaultVeto: Veto = {
  coinFlip: defaultCoinFlip,
  settings: defaultVetoSettings,
  currentSequence: 0,
  passwords: {
    teamA: "",
    teamB: "",
    host: "",
  },
  sequence: [],
}

export const defaultSeries: SanitizedSeries = {
  attachmentCount: 0,
  createdAt: new Date(),
  groupId: null,
  hasAttachment: false,
  id: 0,
  identifier: "aa",
  loserId: null,
  path: "",
  prerequisiteMatchIds: [],
  round: 0,
  scheduledTime: null,
  scores: ["0-0"],
  startedAt: null,
  state: "",
  teamA: {
    id: null,
    isPrereqMatchLoser: false,
    prereqMatchId: null,
  },
  teamB: {
    id: null,
    isPrereqMatchLoser: false,
    prereqMatchId: null,
  },
  tournamentId: 0,
  underwayAt: null,
  updatedAt: new Date(),
  winnerId: null,
  checkInOpen: false,
  checkIns: {},
  custom: true,
  scoreReports: {},
  veto: defaultVeto,
}

export const defaultParticipant: SanitizedParticipant = {
  captain: "",
  createdAt: new Date(),
  isAccepted: true,
  name: "",
  path: "",
  playerIds: [],
  players: {},
  subs: {},
  school: "",
  teamId: "",
  tournamentId: "",
  updatedAt: new Date(),
  custom: true,
}

export const defaultBroadcast: Broadcast = {
  tournament: null,
  matches: {},
  participants: {},
  activeTalents: {},
  talents: {},
  roomId: "",
}

export const defaultAdjText: AdjText = { size: 0, text: "" }
export const defaultAdjSize: AdjSize = { h: 0, w: 0, scale: 0, x: 0, y: 0 }
export const defaultAdjImage: AdjImage = { URL: "", adj: defaultAdjSize }
export const defaultAd: Ad = {
  id: "",
  body: defaultAdjText,
  image: defaultAdjImage,
  headline: defaultAdjText,
}

export const defaultAdPool: AdPool = {
  ads: [],
  duration: 5000,
  transitionDuration: 300,
}

export const defaultMatchPoolItem: MatchPollItem = { teamId: "", vote: 0 }

export const defaultMatchPoll: MatchPoll = {
  a: defaultMatchPoolItem,
  b: defaultMatchPoolItem,
}

export const defaultTicker: Ticker = {
  headline: defaultAdjText,
  verticalText: defaultAdjText,
  scrollerText: defaultAdjText,
}

export const defaultLowerthird: Lowerthird = {
  data: {
    ad: "",
    adPool: defaultAdPool,
    matchPoll: defaultMatchPoll,
    ticker: defaultTicker,
  },
  mode: "ticker",
  show: false,
}

export const defaultLive: Live = {
  activeMatch: "",
  invert: false,
  nextMatch: "",
  prevMatches: [],
  schedule: [],
  activeTalents: {},
  talents: {},
  lt: defaultLowerthird,
  shoutouts: {},
}

export const defaultUser: User = {
  username: "",
  _username: "",
  avatar: "",
  email: "",
  socialHandle: "",
  type: "default",
  uid: "",
  isTalent: false,
}

export const defaultTalent: User = { ...defaultUser, isTalent: true }

export const tbd = { ...defaultParticipant, name: "TBD" }
export const fn = () => {}
export const asyncFn = async () => {}

export interface OBSConnectPayload {
  url: string
  password?: string
}

export const defaultObsCredential: OBSConnectPayload = {
  url: "ws://127.0.0.1:4455",
  password: "",
}
