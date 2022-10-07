import {
  ActionIcon,
  Divider,
  Group,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
} from "@mantine/core"
import { Live } from "interface/ws"
import { useState } from "react"
import { SquareX } from "tabler-icons-react"
import { useMatches } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import MatchCard from "../match/MatchCard.ui"
import Confirm from "../popups/Confirm.ui"
import ActiveMatchQuickActions from "./ActiveMatchActions.ui"

const LiveMatches = () => {
  const { accessToken } = useAuth()
  const { activeMatch, nextMatch, schedule, matches } = useMatches()
  const [showMatches, setShowMatches] = useState(false)

  const clearSchedule = () => {
    const saveData: Partial<Live> = { schedule: [] }
    setLive(accessToken)(saveData)
  }

  return (
    <Stack spacing="xl" pr="xl">
      <Stack spacing="xs">
        <Title order={4}>Active Match</Title>
        {activeMatch ? (
          <>
            <MatchCard match={activeMatch} />
            <ActiveMatchQuickActions />
          </>
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
        <Group align="center">
          <Title order={4}>Schedule</Title>
          <Confirm onConfirm={clearSchedule}>
            <Tooltip label="Clear Schedule">
              <ActionIcon variant="light">
                <SquareX size={18} />
              </ActionIcon>
            </Tooltip>
          </Confirm>
        </Group>
        {schedule.length ? (
          schedule.map((match) => (
            <MatchCard key={match.id} small match={match} withBorder />
          ))
        ) : (
          <Text align="center">No schedule yet.</Text>
        )}
      </Stack>
      <Divider variant="dashed" />
      <Stack>
        <Switch
          label="Show all matches"
          checked={showMatches}
          onChange={() => setShowMatches((s) => !s)}
        />
        {showMatches &&
          Object.values(matches).map((match) => (
            <MatchCard key={match.id} small match={match} withBorder />
          ))}
      </Stack>
    </Stack>
  )
}
export default LiveMatches
