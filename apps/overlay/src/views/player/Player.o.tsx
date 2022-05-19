import { useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box } from "@mantine/core"

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
  const player = params.team === "a" ? activePlayerA : activePlayerB
  const playerCode = +(params.player ?? 0)
  return (
    <Box>
      <Image
        src={player[playerCode]?.photoURL}
        height={800}
        width={800}
        fit="contain"
      />
    </Box>
  )
}
export default Player
