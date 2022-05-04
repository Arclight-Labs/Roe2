import {
  Button,
  Card,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  Text,
} from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { Room } from "interface"
import { useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Plus } from "tabler-icons-react"
import { roomColRef } from "utils/firebase/room.queries"
import RoomCreateModal from "./Room.modal.create"

interface RoomModalProps extends ModalProps {}

const RoomModal = (props: RoomModalProps) => {
  const [createState, setCreateState] = useState(false)
  const [activeRoom, setActiveRoom] = useLocalStorage<Room | null>({
    key: "activeRoom",
    defaultValue: null,
  })

  const openCreate = () => setCreateState(true)
  const closeCreate = () => setCreateState(false)

  const [rooms = [], loading] = useCollectionData(roomColRef)
  return (
    <Modal
      {...props}
      size="xl"
      sx={{ p: "lg" }}
      centered
      title={
        <Group spacing="md" align="center">
          <Text>Select Room</Text>
          <Button
            size="xs"
            variant="outline"
            leftIcon={<Plus size={14} />}
            onClick={openCreate}
          >
            Create Room
          </Button>
        </Group>
      }
    >
      <LoadingOverlay visible={loading} />
      {!rooms.length && !loading && (
        <Stack p="lg" justify="center" align="center">
          <Text align="center">No rooms found yet.</Text>
        </Stack>
      )}
      <Grid>
        <Grid.Col xs={6} md={4}></Grid.Col>
      </Grid>

      <RoomCreateModal opened={createState} onClose={closeCreate} />
    </Modal>
  )
}
export default RoomModal
