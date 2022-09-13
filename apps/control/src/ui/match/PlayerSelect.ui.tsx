import {
  Avatar,
  Card,
  Divider,
  Group,
  Select,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core"
import { SanitizedParticipant, SanitizedUser } from "interface/waypoint"
import { FC, ReactNode } from "react"
import { setParticipant } from "utils/socket/events"
import PlayerSelectFeaturedPlayerItem, {
  FeaturedPlayerItemProps,
} from "./PlayerSelectFeaturedPlayerItem.ui"

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
        <Tooltip key={uid} label={`${player.username}`}>
          <Avatar
            src={player.photoURL}
            onClick={onClick}
            sx={{ cursor: "pointer", opacity: isActive ? 1 : 0.2 }}
          />
        </Tooltip>
      )
    }
  }

  const selectFeaturedPlayer = (id: string | null) => {
    setParticipant(team.teamId, {
      featuredPlayer: id || "",
    })
  }

  const noPlayers = !playerEntries.length && !subEntries.length
  const selectData: FeaturedPlayerItemProps[] = [
    ...playerEntries,
    ...subEntries,
  ].map(([id, player]) => {
    return {
      image: player.photoURL,
      label: player._username || player.username,
      value: id,
    }
  })

  return (
    <Card>
      <Stack spacing="sm">
        <Group noWrap>
          <Avatar src={team.logo} />
          <Stack spacing={0}>
            <Text sx={{ lineHeight: 1 }}>{team.name}</Text>
            <Text align="center" size="sm" color="dimmed">
              {team.school}
            </Text>
          </Stack>
          {!noPlayers && (
            <Select
              searchable
              placeholder="Featured Player"
              value={team.featuredPlayer || ""}
              data={selectData}
              onChange={selectFeaturedPlayer}
              icon={
                <Avatar
                  size="sm"
                  src={
                    team.players[team.featuredPlayer || ""]?.photoURL ||
                    team.subs[team.featuredPlayer || ""]?.photoURL
                  }
                />
              }
              itemComponent={PlayerSelectFeaturedPlayerItem}
            />
          )}
        </Group>
        <Divider />
        <Text size="xs">Select Participating Roster</Text>
        <Group noWrap spacing="sm">
          {noPlayers ? (
            <Text>No players on this team</Text>
          ) : (
            <>
              {playerEntries.map(entriesFn("players"))}
              {subEntries.map(entriesFn("players"))}
            </>
          )}
        </Group>
      </Stack>
    </Card>
  )
}

export default PlayerSelect
