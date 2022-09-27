import { Box, Center, Group } from "@mantine/core"
import { tbd } from "utils/general/defaultValues"
import { useParticipants } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import Head2HeadPlayer from "./h2h.player"
import HeadToHeadTeam from "./h2h.team"
import vs from "./vs.png"

const HeadToHead = () => {
  useParamRoom()
  const {
    activeTeamA = tbd,
    activeTeamB = tbd,
    getFeaturedPlayer,
  } = useParticipants()

  const playerA = getFeaturedPlayer(activeTeamA.teamId)
  const playerB = getFeaturedPlayer(activeTeamB.teamId)
  return (
    <Group
      noWrap
      spacing={0}
      sx={{ height: "100%", justifyContent: "center", alignItems: "flex-end" }}
    >
      <HeadToHeadTeam team={activeTeamA} side="left" />
      <Group noWrap spacing={0} sx={{ position: "relative" }}>
        <Head2HeadPlayer
          player={playerA}
          side="left"
          sx={{ transform: "translateX(20%)" }}
        />
        <Center sx={{ position: "absolute", width: "100%", zIndex: 999 }}>
          <Box
            sx={{
              height: 188,
              width: 260,
              transform: "translateY(-30%)",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("${vs}")`,
            }}
          ></Box>
        </Center>
        <Head2HeadPlayer
          player={playerB}
          side="right"
          sx={{ transform: "translateX(-20%)" }}
        />
      </Group>
      <HeadToHeadTeam team={activeTeamB} side="right" />
    </Group>
  )
}

export default HeadToHead
