import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box } from "@mantine/core"
import { useInverse } from "../../hooks/useInverse.hook"

type Params = Record<"team" | "player", string>
const Player = () => {
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
  const activePlayer = params.team === "a" ? activePlayerA : activePlayerB
  const playerIndex = +(params.player ?? 0)
  return (
    <Box sx={{ height: 600, width: 600 }}>
      <Image
        src={activePlayer[playerIndex]?.photoURL}
        height={600}
        width={600}
        fit="contain"
      />
    </Box>
  )
}
export default Player
