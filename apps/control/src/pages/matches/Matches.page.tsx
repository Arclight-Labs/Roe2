import {
  ActionIcon,
  Button,
  Container,
  Group,
  Loader,
  Stack,
  Title,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { SanitizedSeriesMap } from "interface/waypoint"
import { useState } from "react"
import { Plus, Refresh } from "tabler-icons-react"
import { getMatches } from "utils/axios"
import { defaultSeries } from "utils/general"
import { useMatches, useTournament } from "utils/hooks"
import { setMatches } from "utils/socket/events/Match.emit"
import { useBSave } from "../../context/bsave/bsave.hook"
import MatchCard from "../../ui/match/MatchCard.ui"
import MatchModal from "../../ui/match/MatchModal.ui"
import Confirm from "../../ui/popups/Confirm.ui"

const MatchesPage = () => {
  const [create, toggler] = useToggle([false, true])
  const [loading, setLoading] = useState(false)
  const { id, extends: tournamentsAdded = {} } = useTournament()
  const {
    brackets: { upper, lower },
    matches,
  } = useMatches()
  const bSave = useBSave()

  const ub = Object.entries(upper)
  const lb = Object.entries(lower)

  const toggle = () => toggler()
  const close = () => toggler(false)

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

  const customMatches = Object.values(matches).filter((match) => match.custom)

  return (
    <Container sx={{ width: "100%" }} size="xl">
      <Group align="center" noWrap>
        <Title order={3}>All Matches</Title>
        <Confirm
          onConfirm={refreshAllMatches}
          message="This will refresh all the matches"
        >
          <ActionIcon disabled={loading} variant="light">
            {loading ? <Loader size={18} /> : <Refresh size={18} />}
          </ActionIcon>
        </Confirm>
        <ActionIcon onClick={toggle}>
          <Plus size={14} />
        </ActionIcon>
      </Group>
      <Stack py="lg">
        {!ub.length && !customMatches.length && (
          <Group>
            <Title order={5}>No Matches Yet</Title>
            <Button onClick={toggle} size="xs" leftIcon={<Plus size={16} />}>
              Create
            </Button>
          </Group>
        )}
        {!!ub.length && (
          <>
            <Title order={5}>Playoffs Matches</Title>
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
          </>
        )}
      </Stack>
      {!!customMatches.length && (
        <Stack mt="xl">
          <Title order={5}>Custom Matches</Title>
          <Stack align="flex-start">
            {customMatches.map((series) => (
              <MatchCard match={series} key={series.id} />
            ))}
          </Stack>
        </Stack>
      )}
      <MatchModal
        opened={create}
        onClose={close}
        match={{ ...defaultSeries, custom: true }}
      />
    </Container>
  )
}
export default MatchesPage
