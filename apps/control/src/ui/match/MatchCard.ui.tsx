import { Card, Group, Stack, Text, Title, Tooltip } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { useState } from "react"
import { tbd } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import { usePermission } from "../../hooks/usePermission.hook"
import MatchCardTeam from "./MatchCardTeam.ui"
import MatchModal from "./MatchModal.ui"

type Series = SanitizedSeries
interface MatchCardProps {
  match: Series
}
const MatchCard = ({ match }: MatchCardProps) => {
  const isAllowed = usePermission()
  const { chalTeams } = useParticipants()
  const { getScore: getFinalScore } = useMatches()
  const { teamA, teamB } = match
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)

  const aChalId = teamA.id || ""
  const bChalId = teamB.id || ""
  const a = chalTeams[aChalId || ""] ?? tbd
  const b = chalTeams[bChalId || ""] ?? tbd

  const winnerId = match.winnerId
  const aLoser = aChalId !== winnerId

  const scores = getFinalScore(match)

  return (
    <>
      <Card sx={{ cursor: "pointer" }} onClick={isAllowed ? open : undefined}>
        <Group sx={{ width: 400 }} noWrap>
          <MatchCardTeam team={a} dir="rtl" loser={!!winnerId && aLoser} />
          <Group position="center" sx={{ width: 70 }}>
            <Tooltip
              label={
                <Stack spacing="xs">
                  {match.scores.map((score, index) => (
                    <Text key={index} size="xs">
                      {score}
                    </Text>
                  ))}
                </Stack>
              }
            >
              <Title order={5} align="center">
                {scores.a.final} - {scores.b.final}
              </Title>
            </Tooltip>
          </Group>
          <MatchCardTeam team={b} loser={!!winnerId && !aLoser} />
        </Group>
      </Card>
      <MatchModal opened={opened} onClose={close} match={match} />
    </>
  )
}

export default MatchCard
