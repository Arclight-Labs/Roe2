import { Divider, Stack, Title, Text } from "@mantine/core"
import { useMatches } from "utils/hooks"
import MatchCard from "../match/MatchCard.ui"

const LiveMatches = () => {
  const { activeMatch, nextMatch, schedule } = useMatches()

  return (
    <Stack spacing="xl" pr="xl">
      <Stack spacing="xs">
        <Title order={4}>Active Match</Title>
        {activeMatch ? (
          <MatchCard match={activeMatch} />
        ) : (
          <Text align="center">No active match selected.</Text>
        )}
      </Stack>
      <Divider variant="dashed" />
      <Stack>
        <Title order={4}>Next Match</Title>
        {nextMatch ? (
          <MatchCard match={nextMatch} small withBorder />
        ) : (
          <Text align="center">Next match not yet selected.</Text>
        )}
      </Stack>
      <Divider variant="dashed" />
      <Stack>
        <Title order={4}>Schedule</Title>
        {schedule.length ? (
          schedule.map((match) => (
            <MatchCard key={match.id} small match={match} withBorder />
          ))
        ) : (
          <Text align="center">No schedule yet.</Text>
        )}
      </Stack>
    </Stack>
  )
}
export default LiveMatches
