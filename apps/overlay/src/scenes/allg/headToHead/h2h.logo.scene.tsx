import { Box, Center, Group, Stack } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { tbd } from "utils/general/defaultValues"
import { useParticipants } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import Headline from "../components/text/Headline.ui"
import Subtext from "../components/text/Subtext.ui"
import vs from "./vs.png"

const HeadToHeadLogo = () => {
  useParamRoom()
  const { activeTeamA = tbd, activeTeamB = tbd } = useParticipants()

  return (
    <Group
      noWrap
      sx={{
        height: "100%",
        justifyContent: "space-around",
      }}
      align="center"
    >
      <Team team={activeTeamA} />
      <Center sx={{ position: "absolute", width: "100%", zIndex: 999 }}>
        <Box
          sx={{
            height: 188,
            width: 260,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("${vs}")`,
          }}
        ></Box>
      </Center>
      <Team team={activeTeamB} />
    </Group>
  )
}

interface TeamProps {
  team: SanitizedParticipant
}
const Team = ({ team }: TeamProps) => {
  return (
    <Stack
      sx={{
        width: 650,
        height: 600,
        overflow: "visible",
      }}
      align="center"
      spacing={20}
    >
      <Box
        sx={{
          width: 400,
          height: 400,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("${team.logo}")`,
        }}
      ></Box>
      <Stack spacing={15}>
        <Headline
          align="center"
          sx={{
            fontSize: 90,
            textTransform: "uppercase",
            lineHeight: 0.9,
          }}
        >
          {team.name}
        </Headline>
        <Subtext align="center" sx={{ fontSize: 30 }}>
          {team.school}
        </Subtext>
      </Stack>
    </Stack>
  )
}

export default HeadToHeadLogo
