import {
  ActionIcon,
  Container,
  Group,
  Loader,
  Stack,
  Title,
} from "@mantine/core"
import { SanitizedSeriesMap } from "interface/waypoint"
import { useState } from "react"
import { Refresh } from "tabler-icons-react"
import { getMatches } from "utils/axios"
import { useMatches, useTournament } from "utils/hooks"
import { setMatches } from "utils/socket/events/Match.emit"
import { useBSave } from "../../context/bsave/bsave.hook"
import MatchCard from "../../ui/match/MatchCard.ui"
import Confirm from "../../ui/popups/Confirm.ui"

const MatchesPage = () => {
  const [loading, setLoading] = useState(false)
  const { id, extends: tournamentsAdded = {} } = useTournament()
  const {
    brackets: { upper, lower },
  } = useMatches()
  const bSave = useBSave()

  const ub = Object.entries(upper)
  const lb = Object.entries(lower)

  const refreshAllMatches = async () => {
    setLoading(true)

    let matches: SanitizedSeriesMap = {}
    const ids = [...Object.keys(tournamentsAdded), id]
    const promises = ids.map(async (tournamentId) => {
      return getMatches(tournamentId)
    })
    const results = await Promise.all(promises)
    results.forEach((result) => {
      matches = { ...matches, ...result }
    })
    setMatches(matches)
    bSave({ matches })
    setLoading(false)
  }

  return (
    <Container sx={{ width: "100%" }} size="xl">
      <Stack>
        <Group align="center" noWrap>
          <Title order={3}>Playoffs Matches</Title>
          <Confirm
            onConfirm={refreshAllMatches}
            message="This will refresh all the matches"
          >
            <ActionIcon disabled={loading} variant="light">
              {loading ? <Loader size={18} /> : <Refresh size={18} />}
            </ActionIcon>
          </Confirm>
        </Group>
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
