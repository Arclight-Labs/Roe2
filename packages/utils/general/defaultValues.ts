import { User } from "interface"
import { SanitizedParticipant, SanitizedSeries } from "interface/waypoint"
import { Broadcast, Live } from "interface/ws"

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
  talents: {},
  roomId: "",
}

export const defaultLive: Live = {
  activeMatch: "",
  invert: false,
  nextMatch: "",
  prevMatches: [],
  schedule: [],
  talents: {},
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
