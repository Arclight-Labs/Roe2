import {
  Text,
  Card,
  CardProps,
  Stack,
  Image,
  useMantineTheme,
  Group,
  ActionIcon,
  Loader,
  Popover,
  Button,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { useState } from "react"
import { Check, Select } from "tabler-icons-react"
import {
  getTournament,
  ShallowTournament,
} from "utils/axios/tournament.queries"
import { useTournament } from "utils/hooks"
import { useWsAction } from "utils/socket"
import { useRoom } from "../../context/room/Room.hooks"
import { usePermission } from "../../hooks/usePermission.hook"
import Confirm from "../popups/Confirm.ui"

type TournamentCardProps = Omit<CardProps<"div">, "children"> &
  ShallowTournament
const TournamentCard = ({ id, logo, name, org }: TournamentCardProps) => {
  const isAllowed = usePermission()
  const room = useRoom()
  const [loading, setLoading] = useState(false)
  const tournament = useTournament()
  const [opened, toggle] = useToggle(false, [false, true])
  const close = () => toggle(false)
  const {
    tournament: setTournament,
    participants: setParticipants,
    matches: setMatches,
  } = useWsAction()
  const theme = useMantineTheme()

  const selectTournament = async () => {
    close()
    setLoading(true)
    const { matches, participants, ...tour } = await getTournament(id)
    setTournament(tour)
    setMatches(matches)
    setParticipants(participants)
    await room?.save({
      tournament: tour,
      matches: matches,
      participants: participants,
      roomId: room.id,
      activeMatch: "",
      nextMatch: "",
      schedule: [],
    })
    setLoading(false)
  }

  const isSelected = tournament.id === id
  const shadow = isSelected ? "lg" : "md"

  return (
    <Card radius="md" shadow={shadow} sx={{ height: "100%" }}>
      <Stack>
        <Group position="apart" p={0} align="start">
          <Image src={logo} height={50} width={50} radius="md" />

          <Confirm
            title="Warning"
            message="Selecting tournaments will discard all your updated settings for
            this room"
            onConfirm={selectTournament}
          >
            <ActionIcon>
              {loading ? (
                <Loader size={14} />
              ) : isSelected ? (
                <Check />
              ) : (
                <Select color={theme.colors.gray[5]} />
              )}
            </ActionIcon>
          </Confirm>
        </Group>
        <Stack spacing={0}>
          <Text>{name}</Text>
          <Text size="sm">Hosted by {org}</Text>
        </Stack>
      </Stack>
    </Card>
  )
}

export default TournamentCard
