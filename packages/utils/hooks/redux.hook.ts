import { User } from "interface/db"
import {
  SanitizedParticipant,
  SanitizedSeries,
  SanitizedSeriesMap as SeriesMap,
} from "interface/waypoint"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { defaultParticipant, defaultSeries, tbd } from "../general"
import { defaultPlayer } from "../general/defaultValues"
import {
  addMatch,
  addParticipant,
  setMatches,
  setParticipants,
  updateMatch,
  updateParticipant,
} from "../redux"
import type { AppDispatch, RootState } from "../redux/store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTournament = () => {
  return useAppSelector((s) => s.tournament)
}

type SplitMatchesKeys = "groupsMatches" | "playoffsMatches"
type SplitMatchesReturn = Record<SplitMatchesKeys, SeriesMap>
type SplitMatches = (map: SeriesMap) => SplitMatchesReturn

type MapByGroupReturn = Record<string, SeriesMap>
type MapByGroup = (map: SeriesMap) => MapByGroupReturn

type MapByRoundReturn = Record<string, SeriesMap>
type MapByRound = (map: SeriesMap) => MapByRoundReturn

type SplitByBracketKeys = "upper" | "lower" | "custom"
type SplitByBracketReturn = Record<SplitByBracketKeys, MapByRoundReturn>
type SplitByBracket = (map: SeriesMap) => SplitByBracketReturn

type Score = `${number}-${number}`
type ScoreValue = { scores: number[]; final: number }
type GetScoreReturn = Record<"teamA" | "teamB", ScoreValue>
type GetScore = (match: SanitizedSeries) => GetScoreReturn

type GetTalentReturn = Record<string, User>
type GetTalent = (talent: User) => GetTalentReturn

type AffectedMatch = {
  team: "teamA" | "teamB"
  prereqMatchId: number
  affectedMatch: number
  /* winner id */
  id: number | null
}
type AffectedMatches = Record<string, AffectedMatch>
type GetAffectedMatces = (
  matchId: number,
  winnerId: number | null,
  round: number
) => AffectedMatches

export const useMatches = () => {
  const matches = useAppSelector((s) => s.matches)
  const { live, invert } = useLive()

  // ============ Split Playoffs and Groups
  const splitMatchesByType: SplitMatches = (matchMap) => {
    const playoffsMatches: SeriesMap = {}
    const groupsMatches: SeriesMap = {}
    const matchEntries = Object.entries(matchMap)

    for (const matchEntry of matchEntries) {
      const [matchId, match] = matchEntry
      const inGroups = !!match.groupId

      if (inGroups) groupsMatches[matchId] = match
      if (!inGroups) playoffsMatches[matchId] = match
    }

    return { playoffsMatches, groupsMatches }
  }

  // ============ Map by Group
  const mapByGroup: MapByGroup = (map) => {
    const groups: Record<string, SeriesMap> = {}
    const matchEntries = Object.entries(map)

    matchEntries.forEach(([matchId, match]) => {
      const groupId = match.groupId
      if (!groupId) return
      groups[groupId] = { ...groups[groupId], [matchId]: match }
    })

    return groups
  }

  // ============ Map by Round
  const mapByRound: MapByRound = (map) => {
    const rounds: Record<string, SeriesMap> = {}
    const matchEntries = Object.entries(map)
    const sortedEntries = matchEntries.sort(([, a], [, b]) =>
      a.round > b.round ? 1 : -1
    )

    for (const matchEntry of sortedEntries) {
      const [matchId, match] = matchEntry
      const round = Math.abs(match.round)
      if (!round) continue
      rounds[round] = { ...rounds[round], [matchId]: match }
    }

    return rounds
  }

  // ============ Split Upper and lower bracket
  const splitByBracket: SplitByBracket = (map) => {
    const matchEntries = Object.entries(map)
    const sortedEntries = matchEntries.sort(([, a], [, b]) =>
      a.round > b.round ? 1 : -1
    )
    const upper: SeriesMap = {}
    const lower: SeriesMap = {}
    const custom: SeriesMap = {}

    for (const matchEntry of sortedEntries) {
      const [matchId, match] = matchEntry
      const inUpper = match.round > 0
      const isLower = match.round < 0
      const isCustom = match.custom
      if (inUpper) upper[matchId] = match
      if (isLower) lower[matchId] = match
      if (isCustom) custom[matchId] = match
    }

    return {
      upper: mapByRound(upper),
      lower: mapByRound(lower),
      custom: mapByRound(custom),
    }
  }

  // ========= Get Score
  const getScore: GetScore = (match) => {
    const scores = (match.scores ?? ["0-0"]) as Score[]
    const teamA: ScoreValue = { final: 0, scores: [] }
    const teamB: ScoreValue = { final: 0, scores: [] }
    for (const score of scores) {
      const scoreTuple = score.split("-")
      const [aScore = 0, bScore = 0] = scoreTuple.map(Number)
      teamA.scores.push(aScore)
      teamB.scores.push(bScore)
      if (aScore > bScore) {
        teamA.final++
        continue
      }
      if (bScore > aScore) {
        teamB.final++
      }
    }
    return { teamA, teamB }
  }

  const getScoreWithInvert = (match: SanitizedSeries) => {
    const scores = getScore(match)
    return {
      teamA: invert ? scores.teamB : scores.teamA,
      teamB: invert ? scores.teamA : scores.teamB,
    }
  }

  // ========= Get all affected matches
  const getAffectedMatches: GetAffectedMatces = (matchId, winnerId, round) => {
    let affectedMatches: AffectedMatches = {}
    const matchEntries = Object.entries(matches)
    const roundMatches = matchEntries.filter(
      ([, m]) => Math.abs(m.round) === Math.abs(round) + 1
    )
    if (!roundMatches.length) return {}

    for (const matchEntry of roundMatches) {
      const [entryId, match] = matchEntry
      if (match.teamA.prereqMatchId === matchId) {
        const affectedMatch: AffectedMatch = {
          team: "teamA",
          prereqMatchId: matchId,
          affectedMatch: match.id,
          id: winnerId,
        }
        affectedMatches = {
          ...affectedMatches,
          [entryId]: affectedMatch,
          ...getAffectedMatches(match.id, match.winnerId, match.round),
        }
      }
      if (match.teamB.prereqMatchId === matchId) {
        const affectedMatch: AffectedMatch = {
          team: "teamB",
          prereqMatchId: matchId,
          affectedMatch: match.id,
          id: winnerId,
        }
        affectedMatches = {
          ...affectedMatches,
          [entryId]: affectedMatch,
          ...getAffectedMatches(match.id, match.winnerId, match.round),
        }
      }
    }
    return affectedMatches
  }

  const getUpdatedMatches = (match: SanitizedSeries) => {
    const { id, winnerId, round } = match

    const affectedMatches = getAffectedMatches(id, winnerId, round)
    const affectedMatchEntries = Object.values(affectedMatches)
    const newMatches: SeriesMap = { ...matches, [match.id]: match }

    for (const matchEntry of affectedMatchEntries) {
      const { affectedMatch, team, id } = matchEntry

      if (!newMatches[affectedMatch]) continue

      const oldMatchData = newMatches[affectedMatch]
      const opposingTeam = team === "teamA" ? "teamB" : "teamA"
      const hasChangedTeam =
        !id || !oldMatchData[opposingTeam].id || oldMatchData[team].id !== id

      newMatches[affectedMatch] = {
        ...oldMatchData,
        [team]: { ...oldMatchData[team], id },
        scores: hasChangedTeam ? ["0-0"] : oldMatchData.scores,
        winnerId: hasChangedTeam ? null : oldMatchData.winnerId,
      }
    }

    return newMatches
  }

  // ========= Live data helpers
  const isActive = (match: string | number) => {
    return live.activeMatch === `${match}`
  }
  const isNext = (match: string | number) => {
    return live.nextMatch === `${match}`
  }
  const inSchedule = (match: string | number) => {
    return !!live.schedule.find((s) => s.matchId === `${match}`)
  }

  const nextMatch: SanitizedSeries | undefined = matches[live.nextMatch]
  const activeMatch: SanitizedSeries | undefined = matches[live.activeMatch]
  const schedule = live.schedule.map((s) => matches[s.matchId] ?? defaultSeries)

  const { groupsMatches, playoffsMatches } = splitMatchesByType(matches ?? {})
  const groups = mapByGroup(groupsMatches)
  const brackets = splitByBracket(playoffsMatches)

  const getMatch = (matchId: string = ""): SanitizedSeries | undefined => {
    if (!matchId) return
    return matches[matchId]
  }

  return {
    nextMatch,
    activeMatch,
    schedule,
    brackets,
    matches,
    groups,
    groupsMatches,
    playoffsMatches,
    setMatches,
    updateMatch,
    addMatch,
    splitMatchesByType,
    mapByGroup,
    splitByBracket,
    mapByRound,
    getScore,
    getUpdatedMatches,
    getAffectedMatches,
    isActive,
    isNext,
    inSchedule,
    getMatch,
    getScoreWithInvert,
  }
}

type Team = SanitizedParticipant
type TeamMap = Record<string, Team>
export const useParticipants = () => {
  const { activeMatch = defaultSeries, getMatch } = useMatches()
  const { invert } = useLive()
  const participants = useAppSelector((s) => s.participants)
  const participantArr = Object.values(participants)
  const participantsByChalId = participantArr.reduce<TeamMap>((acc, team) => {
    const chalId = team.chalId
    if (!chalId) return acc
    return { ...acc, [chalId]: team }
  }, {})

  const getActiveTeam = (teamSide: "teamA" | "teamB") => {
    return participantsByChalId[activeMatch[teamSide].id || ""] ?? tbd
  }

  const getPlayer = (participantId: string, playerId: string = "") => {
    const participant = participants[participantId] ?? defaultParticipant
    const allPlayers = { ...participant.players, ...participant.subs }
    return allPlayers[playerId] ?? defaultPlayer
  }

  const getFeaturedPlayer = (participantId: string) => {
    const { featuredPlayer } = participants[participantId] ?? defaultParticipant
    return getPlayer(participantId, featuredPlayer)
  }

  const getTeam = (
    seriesId: string,
    team: "teamA" | "teamB"
  ): SanitizedParticipant | undefined => {
    const match = getMatch(seriesId)
    if (!match) return
    return participantsByChalId[match[team].id || ""]
  }

  const activeTeamA = getActiveTeam("teamA")
  const activeTeamB = getActiveTeam("teamB")
  const activeTeamAWithInvert = getActiveTeam(invert ? "teamB" : "teamA")
  const activeTeamBWithInvert = getActiveTeam(invert ? "teamA" : "teamB")

  return {
    participants,
    chalTeams: participantsByChalId,
    setParticipants,
    updateParticipant,
    addParticipant,
    getActiveTeam,
    activeTeamA,
    activeTeamB,
    activeTeamAWithInvert,
    activeTeamBWithInvert,
    getTeam,
    getPlayer,
    getFeaturedPlayer,
  }
}

export const useLive = () => {
  const live = useAppSelector((s) => s.live)

  const { invert } = live

  const getAllTalents = () => {
    return live.talents
  }
  const getTalentByUID = (talentUID: string) => {
    const talents = live.talents
    return talents[talentUID]
  }

  const getAllActiveTalents: GetTalent = () => {
    return live.activeTalents
  }

  const getActiveTalent = (index: number) => {
    const activeTalent = Object.values(live.activeTalents)
    return activeTalent[index]
  }

  const isActiveTalent = (talent: string) => {
    return live.activeTalents[talent]?.uid === talent
  }

  return {
    live,
    getAllTalents,
    getTalentByUID,
    getAllActiveTalents,
    getActiveTalent,
    isActiveTalent,
    invert,
  }
}

export const useLt = () => {
  const {
    live: { lt },
  } = useLive()
  const { mode, show, data } = lt
  const { ticker, ad, adPool, matchPoll } = data

  return {
    data,
    lt,
    mode,
    show,
    ticker,
    ad,
    adPool,
    matchPoll,
  }
}
