import { useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"
import { useInverse } from "../../hooks/useInverse.hook"
import { defaultSeries } from "utils/general"
import { QueryColor, QueryFont } from "../../utils/queryParams"
import { useQuery } from "../../utils/useQuery"

type TeamCode =
  | "shortcode"
  | "name"
  | "shortname"
  | "schoolShortcode"
  | "school"

type Params = Record<"team" | "name", string>

const TeamName = () => {
  // add this to every overlay page
  useRoom()
  const params = useParams<Params>()
  const query = useQuery()
  const { chalTeams } = useParticipants()
  const { activeMatch, getScore } = useMatches()
  const isInversed = useInverse()
  const teamSide = isInversed(params.team === "a" ? "teamA" : "teamB")
  const teamSideLetter = teamSide === "teamA" ? "a" : "b"
  const teamCode = params.name as TeamCode
  const teamId = activeMatch?.[teamSide].id || ""
  const team = chalTeams[teamId]
  const teamScore = getScore(activeMatch ?? defaultSeries)?.[teamSideLetter]
    .scores

  const font = QueryFont[query.get("font") ?? "industry"]
  const fontColor = QueryColor[query.get("color") ?? "black"]
  const fontSize = +(query.get("size") ?? 120)
  return (
    <Box sx={{ height: 600, width: 2000 }}>
      {/* <Image src={team?.logo} height={600} width={600} fit="contain" /> */}
      <Text sx={{ fontFamily: font, fontSize: fontSize, color: fontColor }}>
        {team?.[teamCode]}
      </Text>
    </Box>
  )
}
export default TeamName
