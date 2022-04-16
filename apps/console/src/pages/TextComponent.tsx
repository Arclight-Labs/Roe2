import { Button, Group, TextInput } from "@mantine/core"
import { useState } from "react"
import { useAppSelector } from "utils/hooks"
import { useWsAction } from "utils/socket"

const TextComponent = () => {
  const tournament = useAppSelector((state) => state.tournament)
  const [roomName, setRoomName] = useState("")
  const [password, setPassword] = useState("")
  const { joinRoom } = useWsAction()

  const onJoin = () => {
    joinRoom({ roomName, password })
  }

  return (
    <div>
      <Group>
        <TextInput
          label="Room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <TextInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Group>
      <Button onClick={onJoin}>Join Room</Button>
    </div>
  )
}

export default TextComponent
