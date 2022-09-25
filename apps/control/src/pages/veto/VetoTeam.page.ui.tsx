import type { SanitizedSeries } from "interface/waypoint"
import { defaultSeries } from "utils/general"
import { useParticipants } from "utils/hooks"

interface Props {
  side: "teamA" | "teamB"
  match: SanitizedSeries
  accessToken: string
}

const VetoTeamPage = ({ side, accessToken, match = defaultSeries }: Props) => {
  const { getTeam } = useParticipants()
  const team = getTeam(match.id.toString(), side)
  return <div></div>
}

export default VetoTeamPage
