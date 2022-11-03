import {
  ActionIcon,
  Card,
  CardProps,
  Group,
  Loader,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { MouseEventHandler, useState } from "react"
import { Refresh } from "tabler-icons-react"
import { getMatch } from "utils/axios"
import { tbd } from "utils/general"
import { useMatches, useParticipants, useTournament } from "utils/hooks"
import { setMatch } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { usePermission } from "../../hooks/usePermission.hook"
import MatchBadges from "./MatchBadges.ui"
import MatchCardTeam from "./MatchCardTeam.ui"
import MatchMenu from "./MatchMenu"
import MatchModal from "./MatchModal.ui"
import MatchVetoModal from "./MatchVetoModal"

type Series = SanitizedSeries
interface MatchCardProps extends Omit<CardProps, "children"> {
  match: Series
  small?: boolean
}
const MatchCard = ({ match, small, ...props }: MatchCardProps) => {
  const isAllowed = usePermission()
  const { chalTeams } = useParticipants()
  const { getScore: getFinalScore } = useMatches()
  const { accessToken } = useAuth()
  const { teamA, teamB } = match
  const [vetoOpened, setVetoOpened] = useState(false)
  const openVeto = () => setVetoOpened(true)
  const closeVeto = () => setVetoOpened(false)
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const { id: tournamentId } = useTournament()
  const [loading, setLoading] = useState(false)

  const aChalId = teamA.id
  const bChalId = teamB.id
  const a = chalTeams[aChalId || ""] ?? tbd
  const b = chalTeams[bChalId || ""] ?? tbd

  const winnerId = match.winnerId
  const aLoser = aChalId !== winnerId

  const scores = getFinalScore(match)

  const refreshMatch: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation()
    setLoading(true)
    const matchId = `${match.id}`
    const res = await getMatch(tournamentId, `${match.id}`)
    setMatch(accessToken)(matchId, res)
    setLoading(false)
  }

  return (
    <>
      <Card
        shadow="xs"
        {...props}
        sx={{ cursor: "pointer", maxWidth: 400, ...props.sx }}
        onClick={isAllowed ? open : undefined}
      >
        <Group
          align="flex-start"
          spacing={2}
          sx={{ top: 2, right: 2, position: "absolute" }}
        >
          <MatchBadges matchId={match.id} />
          {!match.custom && (
            <Tooltip label="Refresh scores">
              <ActionIcon onClick={refreshMatch} disabled={loading}>
                {loading ? <Loader size={18} /> : <Refresh size={18} />}
              </ActionIcon>
            </Tooltip>
          )}
          <MatchMenu match={match} open={open} openVeto={openVeto} />
        </Group>

        <Group noWrap position="apart">
          <MatchCardTeam small={small} team={a} loser={!!winnerId && aLoser} />
          <Group position="center" sx={{ width: 70 }}>
            <Tooltip
              withinPortal
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
              <Title order={5} align="center" sx={{ whiteSpace: "nowrap" }}>
                {scores.teamA.final} - {scores.teamB.final}
              </Title>
            </Tooltip>
          </Group>
          <MatchCardTeam
            small={small}
            team={b}
            loser={!!winnerId && !aLoser}
            dir="rtl"
          />
        </Group>
      </Card>
      <MatchModal opened={opened} onClose={close} match={match} />
      <MatchVetoModal opened={vetoOpened} onClose={closeVeto} match={match} />
    </>
  )
}

export default MatchCard
