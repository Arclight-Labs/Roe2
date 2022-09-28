import { Stack, StackProps } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { tbd } from "utils/general"
import Headline from "../text/Headline.ui"
import MatchTeamLogo from "./Match.team.logo.c"

interface Props extends StackProps {
  team: SanitizedParticipant
}
const MatchTeam = ({ team = tbd, ...props }: Props) => {
  return (
    <Stack align="center" {...props} spacing={5}>
      <MatchTeamLogo logo={team.logo} />
      <Headline sx={{ color: "#fff" }}>{team.shortcode || "TBD"}</Headline>
    </Stack>
  )
}

export default MatchTeam
