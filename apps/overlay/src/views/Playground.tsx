import { Title } from "@mantine/core"
import { useMatches } from "utils/hooks"
import { useParamsCss } from "../hooks/useParamsCss"
import useRoom from "../hooks/useRoom.hook"

const Playground = () => {
  useRoom()
  const params = useParamsCss()
  const { activeMatch } = useMatches()
  return <Title color="red">Halo</Title>
}

export default Playground
