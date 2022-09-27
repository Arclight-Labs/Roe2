import { Box, Center, Group, Stack, Sx } from "@mantine/core"
import { useLocation } from "react-router-dom"
import { defaultSeries } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import { getQueryStringParams } from "../../../../utils/getQueryStringParams"
import Headline from "../text/Headline.ui"
import Subtext from "../text/Subtext.ui"

import aBg from "./team_card_left.png"
import bBg from "./team_card_right.png"

const bg = { teamA: aBg, teamB: bBg }
const outerSideMargin = 40
type Side = "teamA" | "teamB"

const logoStyles: Record<Side, Sx> = {
  teamA: { marginLeft: 40 },
  teamB: { marginRight: outerSideMargin },
}

const textStyles: Record<Side, Sx> = {
  teamA: { textAlign: "left" },
  teamB: { textAlign: "right" },
}

const scoreStyles: Record<Side, Sx> = {
  teamA: { marginRight: 10 },
  teamB: { marginLeft: 25 },
}

const containerStyles: Record<Side, Sx> = {
  teamA: { flexDirection: "row" },
  teamB: { flexDirection: "row-reverse" },
}

interface Props {
  side: "teamA" | "teamB"
}
const TeamCard = ({ side }: Props) => {
  useParamRoom()
  const { search } = useLocation()
  const { noInvert } = getQueryStringParams(search) as { noInvert: string }
  const backgroundImage = `url("${bg[side]}")`
  const {
    getScore,
    getScoreWithInvert,
    activeMatch = defaultSeries,
  } = useMatches()
  const {
    activeTeamA,
    activeTeamB,
    activeTeamAWithInvert,
    activeTeamBWithInvert,
  } = useParticipants()

  const getTeam = (side: Side, noInvert: boolean) => {
    if (noInvert) return side === "teamA" ? activeTeamA : activeTeamB
    return side === "teamA" ? activeTeamAWithInvert : activeTeamBWithInvert
  }

  const noInvertBool = Boolean(noInvert)

  const team = getTeam(side, noInvertBool)
  const scores = noInvertBool
    ? getScore(activeMatch)
    : getScoreWithInvert(activeMatch)

  return (
    <Box
      sx={{
        height: 106,
        width: 675,
        backgroundImage,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Group
        sx={{ width: "100%", ...containerStyles[side] }}
        spacing={10}
        mt={-5}
      >
        <Box
          sx={{
            flexShrink: 0,
            height: 75,
            width: 110,
            ...logoStyles[side],
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("${team?.logo}")`,
          }}
        />
        <Stack spacing={0} sx={{ flex: 1 }}>
          <Headline sx={{ ...textStyles[side] }}>{team.name}</Headline>
          <Subtext sx={{ marginTop: -4, ...textStyles[side] }}>
            {team.school}
          </Subtext>
        </Stack>

        <Center sx={{ height: 75, width: 95, ...scoreStyles[side] }}>
          <Headline sx={{ paddingTop: 5, color: "#fff", fontSize: 65 }}>
            {scores?.[side]?.final}
          </Headline>
        </Center>
      </Group>
    </Box>
  )
}

export default TeamCard
