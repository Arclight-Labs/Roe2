import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  ModalProps,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { Room } from "interface"
import { useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import { Photo, Plus } from "tabler-icons-react"
import { roomColRef } from "utils/firebase/room.queries"
import { RoomModel } from "utils/models/Room.model"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import RoomModal from "../../overlays/Room.modal"

const RoomComponent = () => {
  const [createState, setCreateState] = useState(false)
  const [activeRoom, setActiveRoom] = useActiveRoom()
  const location = useLocation()
  const navigate = useNavigate()
  const openCreate = () => setCreateState(true)
  const closeCreate = () => setCreateState(false)

  const [rooms = [], loading] = useCollectionData(roomColRef)

  const selectRoom = (room: RoomModel) => () => {
    setActiveRoom(room)
    if (location.pathname === "/rooms") {
      navigate("/")
    }
  }

  return (
    <Stack>
      <Group align="center">
        <Title order={4}>
          {activeRoom?.name
            ? `Current Room: ${activeRoom.name}`
            : "Select a room"}
        </Title>
        <Button
          variant="outline"
          leftIcon={<Plus size={14} />}
          size="xs"
          onClick={openCreate}
        >
          Create Room
        </Button>
      </Group>

      {!rooms.length && !loading && (
        <Stack p="lg" justify="center" align="center">
          <Text align="center">No rooms found yet.</Text>
        </Stack>
      )}

      <Grid>
        {rooms.map((room) => (
          <Grid.Col key={room.id} xs={6} md={4} xl={3}>
            <Card
              shadow={activeRoom?.id === room.id ? "lg" : "xs"}
              sx={{ cursor: "pointer" }}
              onClick={selectRoom(room)}
            >
              <Card.Section>
                {room.avatar ? (
                  <Image src={room.avatar} height={160} />
                ) : (
                  <Stack
                    justify="center"
                    align="center"
                    sx={(theme) => ({
                      height: 160,
                      backgroundColor: theme.colors.gray[1],
                    })}
                  >
                    <Photo size={50} />
                  </Stack>
                )}
              </Card.Section>
              <Stack pt="sm">
                <Text weight={500}>{room.name}</Text>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <RoomModal opened={createState} onClose={closeCreate} />
    </Stack>
  )
}
export default RoomComponent
