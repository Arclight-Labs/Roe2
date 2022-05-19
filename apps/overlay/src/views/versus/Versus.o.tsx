import { useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text, Center, Stack } from "@mantine/core"

type Params = Record<"team" | "versus", string>
const Versus = () => {
  // add this to every overlay page
  useRoom()
  const params = useParams<Params>()
  const { chalTeams, activeTeamAWithInvert, activeTeamBWithInvert } =
    useParticipants()

  const activePlayerA = Object.values(activeTeamAWithInvert.players).filter(
    (player) => player.isActive
  )
  const activePlayerB = Object.values(activeTeamBWithInvert.players).filter(
    (player) => player.isActive
  )
  const player = params.team === "a" ? activePlayerA : activePlayerB
  const playerCode = +(params.versus ?? 0)

  return (
    <Box sx={{ height: 800, width: 800 }}>
      <Stack align="center">
        <Text
          sx={{
            fontFamily: "Avalanche",
            fontSize: 80,
            color: "#ffd200",
            marginTop: "26rem",
          }}
        >
          {player[playerCode]?.username}
        </Text>
        <Text
          sx={{
            fontFamily: "Roboto",
            fontSize: 20,
            color: "#ffd200",
            marginTop: "-3rem",
          }}
        >
          {player[playerCode]?.school}
        </Text>
        <Image
          src={"/src/public/PlayerBanner.png"}
          height={450}
          width={450}
          fit="contain"
          sx={{ position: "absolute", zIndex: -1, marginTop: "17rem" }}
        />
        <Image
          src={player[playerCode]?.photoURL}
          height={800}
          width={800}
          fit="contain"
          sx={{ position: "absolute", zIndex: -2 }}
        />
      </Stack>
    </Box>
  )
}

export default Versus
