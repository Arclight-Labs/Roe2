import { defaultSeries, tbd } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import G from "../../../../components/G.c"
import S from "../../../../components/S"
import Headline from "../text/Headline.ui"
import Versus from "../vs/VS.c"
import MatchTeam from "./Match.team.c"

interface Props {
  blurLoser?: boolean
  seriesId?: string
}
const Match = ({ seriesId = "", blurLoser = false }: Props) => {
  const { getTeam } = useParticipants()
  const { getScore, getMatch } = useMatches()
  const teamA = getTeam(seriesId, "teamA") || tbd
  const teamB = getTeam(seriesId, "teamB") || tbd
  const match = getMatch(seriesId) || defaultSeries
  const scores = getScore(match)

  const isLoser = (side: "teamA" | "teamB") => {
    if (!blurLoser) return false
    const teams = { teamA, teamB }
    const hasWinner = !!match.winnerId
    return hasWinner && match.winnerId !== teams[side].chalId
  }

  return (
    <G align="center" noWrap>
      <G sx={{ position: "relative" }}>
        <MatchTeam
          sx={{ opacity: isLoser("teamA") ? 0.5 : 1 }}
          px={25}
          team={teamA}
        />
        <MatchTeam
          sx={{ opacity: isLoser("teamB") ? 0.5 : 1 }}
          px={25}
          team={teamB}
        />
        <S
          sx={{
            justifyContent: "flex-end",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 999,
          }}
        >
          <S align="center">
            <Versus size={85} mb={30} />
            <Headline
              mb={-10}
              sx={{ flexShrink: 0, fontSize: 50 }}
              align="center"
            >
              {scores.teamA.final}-{scores.teamB.final}
            </Headline>
          </S>
        </S>
      </G>
    </G>
  )
}

export default Match
