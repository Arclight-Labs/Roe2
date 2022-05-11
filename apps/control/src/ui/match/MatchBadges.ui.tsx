import { Group, GroupProps, ThemeIcon } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { PlayerTrackNext, Select, ListDetails } from "tabler-icons-react"
import { useMatches } from "utils/hooks"
import MatchBadge from "./MatchBadge.ui"

interface MatchBadges extends GroupProps {
  matchId: string | number
}
const MatchBadges = ({ matchId, ...props }: MatchBadges) => {
  const { isActive, isNext, inSchedule } = useMatches()
  return (
    <Group spacing={2} align="flex-start" {...props}>
      {isActive(matchId) && (
        <MatchBadge label="Active Match">
          <Select size={12} />
        </MatchBadge>
      )}
      {isNext(matchId) && (
        <MatchBadge label="Next Match">
          <PlayerTrackNext size={12} />
        </MatchBadge>
      )}
      {inSchedule(matchId) && (
        <MatchBadge label="Scheduled Match">
          <ListDetails size={12} />
        </MatchBadge>
      )}
    </Group>
  )
}
export default MatchBadges
