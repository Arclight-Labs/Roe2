import { ActionIcon, Container, Grid, Group, Stack, Title } from "@mantine/core"
import { useState } from "react"
import { Plus } from "tabler-icons-react"
import { useParticipants } from "utils/hooks"
import ParticipantCard from "../../ui/participant/ParticipantCard.ui"
import ParticipantModal from "../../ui/participant/ParticipantModal.ui"

const ParticipantsPage = () => {
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const { participants } = useParticipants()
  const sorted = Object.entries(participants).sort(([, a], [, b]) =>
    a.name > b.name ? 1 : -1
  )
  return (
    <Container size="xl" sx={{ width: "100%" }}>
      <Stack>
        <Group noWrap align="center">
          <Title order={3}>Participants</Title>
          <ActionIcon variant="filled" onClick={open}>
            <Plus size={14} />
          </ActionIcon>
        </Group>
        <Grid>
          {sorted.map(([id, participant]) => (
            <Grid.Col xs={6} md={4} xl={3} key={id}>
              <ParticipantCard team={participant} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <ParticipantModal
        opened={opened}
        onClose={close}
        participant={{
          school: "",
          name: "",
          logo: "",
          schoolShortcode: "",
          shortcode: "",
          shortname: "",
        }}
      />
    </Container>
  )
}
export default ParticipantsPage
