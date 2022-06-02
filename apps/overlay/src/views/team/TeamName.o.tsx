import { useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Box, Text } from "@mantine/core"
import { useInverse } from "../../hooks/useInverse.hook"
import { QueryColor, QueryFont } from "../../utils/queryParams"
import { useQuery } from "../../utils/useQuery"

type TeamCode =
  | "shortcode"
  | "name"
  | "shortname"
  | "schoolShortcode"
  | "school"

type Params = Record<"team" | "name", string>
type alignType = "left" | "center" | "right" | undefined

const TeamName = () => {
  useRoom()
  const params = useParams<Params>()
  const query = useQuery()
  const { chalTeams } = useParticipants()
  const { activeMatch, getScore } = useMatches()
  const isInversed = useInverse()
  const teamSide = isInversed(params.team === "a" ? "teamA" : "teamB")
  const teamCode = params.name as TeamCode
  const teamId = activeMatch?.[teamSide].id || ""
  const team = chalTeams[teamId]
  const font = QueryFont[query.get("font") ?? "industry"]
  const fontColor = QueryColor[query.get("color") ?? "black"]
  const fontSize = +(query.get("size") ?? 100)
  const align = query.get("align") ?? "left"

  return (
    <Box sx={{ height: 600, width: 1500 }}>
      <Text
        sx={{ fontFamily: font, fontSize: fontSize, color: fontColor }}
        align={align as alignType}
      >
        {team?.[teamCode]}
      </Text>
    </Box>
  )
}
export default TeamName
