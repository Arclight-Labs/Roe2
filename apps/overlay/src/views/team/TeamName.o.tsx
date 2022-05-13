import { useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { useInverse } from "../../hooks/useInverse.hook"
import { defaultSeries } from "utils/general"

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

  return (
    <Box sx={{ height: 600, width: 600 }}>
      {/* <Image src={team?.logo} height={600} width={600} fit="contain" /> */}
      <Text sx={{ fontFamily: "Industry", fontSize: 40 }}>
        {team?.[teamCode]}
      </Text>
      <Text sx={{ fontFamily: "Industry", fontSize: 40 }}>{teamScore}</Text>
    </Box>
  )
}
export default TeamName
