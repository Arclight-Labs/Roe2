import { Container } from "@mantine/core"
import RoomDirectory from "../comps/room/Room.component"

const RoomSelect = () => {
  return (
    <Container size="xl" sx={{ width: "100%" }}>
      <RoomDirectory />
    </Container>
  )
}
export default RoomSelect
