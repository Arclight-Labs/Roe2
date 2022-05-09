import { useState } from "react"
import { Menu, Group, MenuProps } from "@mantine/core"
import { Logout, Settings, SwitchHorizontal } from "tabler-icons-react"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth/Auth.hooks"
import RoomModal from "../../overlays/Room.modal"
import { RoomModel } from "utils/models/Room.model"

interface RoomMenuProps extends Omit<MenuProps, "children"> {}
export function RoomMenu(props: RoomMenuProps) {
  const [activeRoom, setActiveRoom] = useActiveRoom()
  const { auth } = useAuth()
  const [opened, isOpened] = useState(false)
  const open = () => isOpened(true)
  const close = () => isOpened(false)

  const leaveRoom = () => {
    setActiveRoom(null)
  }

  const isAdmin =
    auth &&
    (activeRoom?.admins.includes(auth.uid) || activeRoom?.owner === auth.uid)

  return (
    <Group position="center" sx={{ width: "100%" }}>
      <Menu
        {...props}
        withArrow
        size={300}
        position="bottom"
        placement="center"
        transition="pop"
      >
        <>
          <Menu.Label>Room</Menu.Label>
          <Menu.Item
            disabled={!isAdmin}
            onClick={open}
            icon={<Settings size={14} />}
          >
            Room Settings
          </Menu.Item>
          <Menu.Item
            component={Link}
            to="/rooms"
            icon={<SwitchHorizontal size={14} />}
          >
            Switch Room
          </Menu.Item>
          <Menu.Item onClick={leaveRoom} icon={<Logout size={14} />}>
            Leave
          </Menu.Item>
        </>
      </Menu>
      {activeRoom && (
        <RoomModal
          data={new RoomModel(activeRoom)}
          opened={opened}
          onClose={close}
        />
      )}
    </Group>
  )
}
