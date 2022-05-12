import { Container, Group, Stack, Title } from "@mantine/core"
import { useMatches } from "utils/hooks"
import MatchCard from "../../ui/match/MatchCard.ui"

const MatchesPage = () => {
  const {
    brackets: { upper, lower },
  } = useMatches()

  const ub = Object.entries(upper)
  const lb = Object.entries(lower)

  return (
    <Container sx={{ width: "100%" }} size="xl">
      <Stack>
        <Title order={3}>Playoffs Matches</Title>
        <Stack>
          <Group noWrap spacing="xl">
            {ub.map(([round, seriesMap]) => (
              <Stack key={round} sx={{ alignSelf: "flex-start" }}>
                <Title order={5}>UB Round {round}</Title>
                <Stack justify="center">
                  {Object.entries(seriesMap).map(([seriesId, series]) => (
                    <MatchCard match={series} key={seriesId} />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Group>
          <Group noWrap spacing="xl">
            {lb.map(([round, seriesMap]) => (
              <Stack key={round} sx={{ alignSelf: "flex-start" }}>
                <Title order={5}>LB Round {round}</Title>
                <Stack justify="center">
                  {Object.entries(seriesMap).map(([seriesId, series]) => (
                    <MatchCard match={series} key={seriesId} />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Group>
        </Stack>
      </Stack>
    </Container>
  )
}
export default MatchesPage
