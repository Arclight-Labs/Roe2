import { Container, Grid, Stack, Title } from "@mantine/core"
import { useParticipants } from "utils/hooks"
import ParticipantCard from "../../ui/participant/ParticipantCard.ui"

const ParticipantsPage = () => {
  const { participants } = useParticipants()
  return (
    <Container size="xl" sx={{ width: "100%" }}>
      <Stack>
        <Title order={3}>Participants</Title>
        <Grid>
          {Object.entries(participants).map(([id, participant]) => (
            <Grid.Col xs={6} md={4} xl={3} key={id}>
              <ParticipantCard team={participant} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}
export default ParticipantsPage
