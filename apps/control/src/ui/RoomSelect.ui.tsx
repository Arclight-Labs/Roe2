import { Container } from "@mantine/core"
import { FC } from "react"
import RoomDirectory from "./room/Room.ui"

interface Props {
  small?: boolean
}
const RoomSelect: FC<Props> = ({ small }) => {
  return (
    <Container size="xl" sx={{ width: "100%" }}>
      <RoomDirectory small={small} />
    </Container>
  )
}
export default RoomSelect
