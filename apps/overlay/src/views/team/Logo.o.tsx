import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box } from "@mantine/core"
import { useInverse } from "../../hooks/useInverse.hook"

type Params = Record<"team", string>
const Logo = () => {
  useRoom()
  const params = useParams<Params>()
  const { chalTeams } = useParticipants()
  const { activeMatch } = useMatches()
  const isInversed = useInverse()
  const teamSide = isInversed(params.team === "a" ? "teamA" : "teamB")
  const teamId = activeMatch?.[teamSide].id || ""
  const team = chalTeams[teamId]

  return (
    <Box sx={{ height: 600, width: 600 }}>
      <Image src={team?.logo} height={600} width={600} fit="contain" />
    </Box>
  )
}
export default Logo
