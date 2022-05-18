import { Avatar, Group, Stack, Text, Tooltip } from "@mantine/core"
import { SanitizedParticipant, SanitizedUser } from "interface/waypoint"
import { FC, ReactNode } from "react"
import { setParticipant } from "utils/socket/events"

type PlayerEntry = [string, SanitizedUser]
type EntryMapFn = ([uid, player]: PlayerEntry) => ReactNode
type EntriesFn = (type: "players" | "subs") => EntryMapFn

interface PlayerSelectProps {
  team: SanitizedParticipant
}
const PlayerSelect: FC<PlayerSelectProps> = ({ team }) => {
  const playerEntries = Object.entries(team.players)
  const subEntries = Object.entries(team.subs)

  const entriesFn: EntriesFn = (type) => {
    return ([uid, player]) => {
      const isActive = player.isActive
      const onClick = () => {
        setParticipant(team.teamId, {
          [type]: { ...team[type], [uid]: { ...player, isActive: !isActive } },
        })
      }
      return (
        <Tooltip
          key={uid}
          label={`${player.username}${type === "subs" && " (sub)"}`}
          sx={{ opacity: isActive ? 1 : 0.5 }}
        >
          <Avatar
            src={player.photoURL}
            onClick={onClick}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
      )
    }
  }

  return (
    <Stack>
      <Group noWrap>
        <Avatar src={team.logo} />
        <Stack spacing={0}>
          <Text sx={{ lineHeight: 1 }}>{team.name}</Text>
          <Text align="center" size="sm" color="dimmed">
            {team.school}
          </Text>
        </Stack>
      </Group>
      <Group noWrap spacing="sm">
        {playerEntries.map(entriesFn("players"))}
        {subEntries.map(entriesFn("players"))}
      </Group>
    </Stack>
  )
}

export default PlayerSelect
