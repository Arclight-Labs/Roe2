import { User } from "interface"
import { SanitizedParticipant, SanitizedSeries } from "interface/waypoint"
import { Broadcast, Live, Lowerthird } from "interface/ws"
import {
  Ad,
  AdjSize,
  AdjText,
  AdPool,
  MatchPoll,
  MatchPollItem,
  Ticker,
} from "interface/ws/Live.interface"

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

export const defaultAd: Ad = {
  body: defaultAdjText,
  adj: defaultAdjSize,
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
  scrollerText: defaultAdjText,
}

export const defaultLowerthird: Lowerthird = {
  data: {
    ad: defaultAd,
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
