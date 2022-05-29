import { useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Box, Text } from "@mantine/core"
import { QueryColor, QueryFont } from "../../utils/queryParams"
import { useQuery } from "../../utils/useQuery"
import { adjImageStyles } from "utils/general"

type PlayerCode = "photoURL" | "username" | "school"

type Params = Record<"team" | "player" | "code", string>
type alignType = "left" | "center" | "right" | undefined

const Player = () => {
  useRoom()
  const query = useQuery()
  const params = useParams<Params>()
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

  const font = QueryFont[query.get("font") ?? "industry"]
  const fontColor = QueryColor[query.get("color") ?? "black"]
  const fontSize = +(query.get("size") ?? 100)
  const align = query.get("align") ?? "left"

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
          align={align as alignType}
        >
          {player[playerIndex]?.[playerCode]}
        </Text>
      )}
    </Box>
  )
}
export default Player
