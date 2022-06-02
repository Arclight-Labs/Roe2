import { useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Box, Text } from "@mantine/core"
import { useInverse } from "../../hooks/useInverse.hook"
import { useAdjQuery } from "../../utils/useAdjQuery"

type TeamCode =
  | "shortcode"
  | "name"
  | "shortname"
  | "schoolShortcode"
  | "school"

type Params = Record<"team" | "name", string>

const TeamName = () => {
  useRoom()
  const params = useParams<Params>()
  const { font, fontColor, fontSize, align } = useAdjQuery()
  const { chalTeams } = useParticipants()
  const { activeMatch } = useMatches()
  const isInversed = useInverse()
  const teamSide = isInversed(params.team === "a" ? "teamA" : "teamB")
  const teamCode = params.name as TeamCode
  const teamId = activeMatch?.[teamSide].id || ""
  const team = chalTeams[teamId]

  return (
    <Box sx={{ height: 600, width: 1500 }}>
      <Text
        sx={{ fontFamily: font, fontSize: fontSize, color: fontColor }}
        align={align}
      >
        {team?.[teamCode]}
      </Text>
    </Box>
  )
}
export default TeamName
