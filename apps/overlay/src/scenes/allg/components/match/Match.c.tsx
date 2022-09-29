import { defaultSeries, tbd } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import G from "../../../../components/G.c"
import S from "../../../../components/S"
import Headline from "../text/Headline.ui"
import Versus from "../vs/VS.c"
import MatchTeam from "./Match.team.c"

interface Props {
  seriesId?: string
}
const Match = ({ seriesId = "" }: Props) => {
  const { getTeam } = useParticipants()
  const { getScore, getMatch } = useMatches()
  const teamA = getTeam(seriesId, "teamA") || tbd
  const teamB = getTeam(seriesId, "teamB") || tbd
  const scores = getScore(getMatch(seriesId) || defaultSeries)
  return (
    <G align="center" noWrap>
      <G sx={{ position: "relative" }}>
        <MatchTeam px={25} team={teamA} />
        <MatchTeam px={25} team={teamB} />
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
