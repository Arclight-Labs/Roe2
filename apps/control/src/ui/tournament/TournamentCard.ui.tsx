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
} from "@mantine/core"
import { useState } from "react"
import { Check, Select } from "tabler-icons-react"
import {
  getTournament,
  ShallowTournament,
} from "utils/axios/tournament.queries"
import { useTournament } from "utils/hooks"
import { useWsAction } from "utils/socket"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useRoom } from "../../context/room/Room.hooks"

type TournamentCardProps = Omit<CardProps<"div">, "children"> &
  ShallowTournament
const TournamentCard = ({ id, logo, name, org }: TournamentCardProps) => {
  const { auth } = useAuth()
  const room = useRoom()
  const [loading, setLoading] = useState(false)
  const tournament = useTournament()

  const {
    tournament: setTournament,
    participants: setParticipants,
    matches: setMatches,
  } = useWsAction()
  const theme = useMantineTheme()

  const selectTournament = async () => {
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
    })
    setLoading(false)
  }

  const isAdmin =
    auth && (room?.owner === auth.uid || room?.admins.includes(auth.uid))

  return (
    <Card radius="md" shadow="md" sx={{ height: "100%" }}>
      <Stack>
        <Group position="apart" p={0} align="start">
          <Image src={logo} height={50} width={50} radius="md" />
          <ActionIcon onClick={selectTournament} disabled={!isAdmin}>
            {loading ? (
              <Loader size={14} />
            ) : tournament.id === id ? (
              <Check />
            ) : (
              <Select color={theme.colors.gray[5]} />
            )}
          </ActionIcon>
        </Group>
        <Stack spacing={0}>
          <Text>{name}</Text>
          <Text
            size="sm"
            color={tournament.id === id ? theme.black : theme.colors.gray[6]}
          >
            Hosted by {org}
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}

export default TournamentCard
