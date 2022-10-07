import {
  Button,
  Card,
  Group,
  NumberInput,
  Stack,
  Switch,
  Text,
} from "@mantine/core"
import { useState } from "react"
import { useLive, useMatches, useParticipants } from "utils/hooks"
import { setLive, setMatch } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import ParticipantInline from "../participant/ParticipantInline.ui"
import Confirm from "../popups/Confirm.ui"

const ActiveMatchQuickActions = () => {
  const [flashTimer, setFlashTimer] = useState(10)
  const [winnerFlashA, setWinnerFlashA] = useState(false)
  const [winnerFlashB, setWinnerFlashB] = useState(false)
  const { live } = useLive()
  const { accessToken } = useAuth()
  const { activeMatch } = useMatches()
  const { activeTeamA, activeTeamB } = useParticipants()

  const setWinnerFlash = (team: "teamA" | "teamB" | null) => {
    setLive(accessToken)({ winnerFlash: team })
  }

  const quickWin = (team: "teamA" | "teamB") => () => {
    setMatch(accessToken)(activeMatch.id.toString(), {
      scores: [...(activeMatch.scores ?? []), team === "teamA" ? "1-0" : "0-1"],
    })

    if (team === "teamA" && winnerFlashA) {
      setWinnerFlash(team)
      setTimeout(() => setWinnerFlash(null), flashTimer * 1000)
    }

    if (team === "teamB" && winnerFlashB) {
      setWinnerFlash(team)
      setTimeout(() => setWinnerFlash(null), flashTimer * 1000)
    }
  }
  return (
    <Card withBorder>
      <Stack>
        <Text size="sm">Quick Actions</Text>
        <Group grow>
          <Card withBorder>
            <Stack>
              <ParticipantInline team={activeTeamA} />
              <Group>
                <Confirm onConfirm={quickWin("teamA")}>
                  <Button size="xs">Quick Win</Button>
                </Confirm>
                <Switch
                  label="Flash winner screen?"
                  checked={winnerFlashA}
                  onChange={() => setWinnerFlashA((s) => !s)}
                />
              </Group>
            </Stack>
          </Card>
          <Card withBorder>
            <Stack>
              <ParticipantInline team={activeTeamB} />
              <Group>
                <Confirm onConfirm={quickWin("teamB")}>
                  <Button size="xs">Quick Win</Button>
                </Confirm>
                <Switch
                  label="Flash winner screen?"
                  checked={winnerFlashB}
                  onChange={() => setWinnerFlashB((s) => !s)}
                />
              </Group>
            </Stack>
          </Card>
        </Group>
        <NumberInput
          value={flashTimer}
          onChange={(value) => setFlashTimer(value || 10)}
          label="Flash Timer (secs)"
        />
        {live.winnerFlash && (
          <Button color="red" onClick={() => setWinnerFlash(null)}>
            STOP WINNER FLASH
          </Button>
        )}
      </Stack>
    </Card>
  )
}

export default ActiveMatchQuickActions
