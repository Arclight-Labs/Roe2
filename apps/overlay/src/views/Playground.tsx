import { Title } from "@mantine/core"
import useRoom from "../hooks/useRoom.hook"

const Playground = () => {
  useRoom()
  return <Title color="red">Halo</Title>
}

export default Playground
