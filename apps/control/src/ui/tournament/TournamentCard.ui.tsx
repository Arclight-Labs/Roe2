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
import {
  useAppSelector,
  useMatches,
  useParticipants,
  useTournament,
} from "utils/hooks"
import { useWsAction } from "utils/socket"

type TournamentCardProps = Omit<CardProps<"div">, "children"> &
  ShallowTournament
const TournamentCard = ({ id, logo, name, org }: TournamentCardProps) => {
  const [loading, setLoading] = useState(false)
  const tournament = useTournament()
  const { matches } = useMatches()
  const { participants } = useParticipants()

  console.log("tournament", tournament)
  console.log("matches", matches)
  console.log("participants", participants)
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
    setLoading(false)
  }

  return (
    <Card radius="md" shadow="md" sx={{ height: "100%" }}>
      <Stack>
        <Group position="apart" p={0} align="start">
          <Image src={logo} height={50} width={50} radius="md" />
          <ActionIcon onClick={selectTournament}>
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
