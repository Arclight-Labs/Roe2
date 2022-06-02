import { useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Box, Text } from "@mantine/core"
import { adjImageStyles } from "utils/general"
import { useAdjQuery } from "../../utils/useAdjQuery"

type PlayerCode = "photoURL" | "username" | "school"
type Params = Record<"team" | "player" | "code", string>

const Player = () => {
  useRoom()
  const params = useParams<Params>()
  const { font, fontColor, fontSize, align } = useAdjQuery()
  const { activeTeamAWithInvert, activeTeamBWithInvert } = useParticipants()

  const activePlayerA = Object.values(activeTeamAWithInvert.players).filter(
    (player) => player.isActive
  )
  const activePlayerB = Object.values(activeTeamBWithInvert.players).filter(
    (player) => player.isActive
  )
  const player = params.team === "a" ? activePlayerA : activePlayerB
  const playerIndex = +(params.player ?? 0)
  const playerCode = (params.code as PlayerCode) ?? "photoURL"

  return (
    <Box>
      {playerCode === "photoURL" ? (
        <Box
          sx={{
            ...adjImageStyles({
              adj: { ...player[playerIndex]?.photoAdj, h: 800, w: 800 },
              URL: player[playerIndex]?.photoURL || "",
            }),
          }}
        />
      ) : (
        <Text
          sx={{
            marginLeft: "1rem",
            fontFamily: font,
            fontSize: fontSize,
            color: fontColor,
          }}
          align={align}
        >
          {player[playerIndex]?.[playerCode]}
        </Text>
      )}
    </Box>
  )
}
export default Player
