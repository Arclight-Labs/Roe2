import { Divider, Stack, Title } from "@mantine/core"
import { useMatches, useParticipants } from "utils/hooks"
import MatchCard from "../../ui/match/MatchCard.ui"
import PlayerSelect from "../../ui/match/PlayerSelect.ui"

const StateActiveMatch = () => {
  const { activeMatch } = useMatches()

  const { activeTeamA, activeTeamB } = useParticipants()

  if (!activeMatch) return <Title order={4}>No active match selected yet</Title>
  return (
    <Stack spacing="xl">
      <Stack>
        <Title order={4}>Match</Title>
        <MatchCard match={activeMatch} sx={{ alignSelf: "flex-start" }} />
      </Stack>
      <Divider />
      <Stack>
        <Title order={4}>Players</Title>
      </Stack>
      <Stack spacing="xl">
        <PlayerSelect team={activeTeamA} />
        <PlayerSelect team={activeTeamB} />
      </Stack>
    </Stack>
  )
}

export default StateActiveMatch
