import { useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Box, Text } from "@mantine/core"
import { useAdjQuery } from "../../utils/useAdjQuery"

type Params = Record<"team" | "player" | "code" | "stats", string>

const PlayerStats = () => {
  useRoom()
  const params = useParams<Params>()
  const { font, fontColor, fontSize, align, record } = useAdjQuery()
  const { activeTeamAWithInvert, activeTeamBWithInvert } = useParticipants()

  const activePlayerA = Object.values(activeTeamAWithInvert.players).filter(
    (player) => player.isActive
  )
  const activePlayerB = Object.values(activeTeamBWithInvert.players).filter(
    (player) => player.isActive
  )
  const player = params.team === "a" ? activePlayerA : activePlayerB
  const playerIndex = +(params.player ?? 0)
  const playerStatID = params.stats ?? "stat-1"

  return (
    <Box>
      <Text
        sx={{
          marginLeft: "1rem",
          fontFamily: font,
          fontSize: fontSize,
          color: fontColor,
        }}
        align={align}
      >
        {player[playerIndex]?.stats?.[playerStatID]?.[record]}
      </Text>
    </Box>
  )
}
export default PlayerStats
