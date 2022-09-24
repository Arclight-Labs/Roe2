import {
  Alert,
  Container,
  Grid,
  Group,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core"
import { useQuery } from "react-query"
import { Backhoe } from "tabler-icons-react"
import { getAllTournaments } from "utils/axios"
import TournamentCard from "../../ui/tournament/TournamentCard.ui"

const TournamentPage = () => {
  const { data, error } = useQuery("getTournaments", getAllTournaments)
  // const tournament = useAppSelector((s) => s.tournament)
  return (
    <Container size="xl">
      <Stack>
        <Alert icon={<Backhoe />}>This page is under construction</Alert>
        <Title order={3}>Select Tournament</Title>
        <Group>
          {!data ? (
            error ? (
              <Alert color="red">{JSON.stringify(error)}</Alert>
            ) : (
              <Grid>
                {Array(3)
                  .fill("1")
                  .map((_, i) => (
                    <Grid.Col key={i} xs={6} md={4} xl={3}>
                      <Skeleton>
                        <TournamentCard
                          id=""
                          logo=""
                          name="Test Tournament Name"
                          org=""
                          path=""
                        />
                      </Skeleton>
                    </Grid.Col>
                  ))}
              </Grid>
            )
          ) : (
            <Grid>
              {data.map((tour) => (
                <Grid.Col xs={6} md={4} xl={3} key={tour.id}>
                  <TournamentCard {...tour} />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Group>
      </Stack>
    </Container>
  )
}

export default TournamentPage
