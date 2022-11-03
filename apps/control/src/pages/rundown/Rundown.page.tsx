import { ActionIcon, Container, Group, Stack, Title } from "@mantine/core"
import { useState } from "react"
import { Plus } from "tabler-icons-react"
import { useRoom } from "../../context/room/Room.hooks"
import RundownModalForm from "../../ui/rundown/Rundown.form"
import RundownList from "../../ui/rundown/Rundown.list"

const RundownPage = () => {
  const [opened, setOpened] = useState(false)
  const close = () => setOpened(false)
  const open = () => setOpened(true)
  const room = useRoom()
  return (
    <Container sx={{ width: "100%" }}>
      <Stack>
        <Group noWrap align="center">
          <Title order={3}>Show Rundowns</Title>
          <ActionIcon variant="light" color="blue" onClick={open}>
            <Plus />
          </ActionIcon>
        </Group>
        {room && <RundownList roomId={room.id} />}
        <RundownModalForm onClose={close} opened={opened} />
      </Stack>
    </Container>
  )
}

export default RundownPage
