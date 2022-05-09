import {
  Button,
  Card,
  CardProps,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import PlayerAvatar from "./PlayerAvatar.ui"

interface ParticipantCardProps {
  team: SanitizedParticipant
  CardProps?: CardProps<"div">
}
const ParticipantCard = ({ CardProps, team }: ParticipantCardProps) => {
  return (
    <Card shadow="sm" {...CardProps}>
      <Stack>
        <Image src={team.logo} height={60} width={60} radius="md" />
        <Text>{team.name}</Text>
        <Group spacing="xs">
          {Object.entries(team.players).map(([id, player]) => (
            <PlayerAvatar key={id} player={player} teamId={team.teamId} />
          ))}
        </Group>
        <Group noWrap spacing="sm">
          <Button sx={{ flex: 1 }} size="xs" variant="outline">
            Edit Details
          </Button>
          <Button sx={{ flex: 1 }} size="xs">
            Players
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}
export default ParticipantCard
