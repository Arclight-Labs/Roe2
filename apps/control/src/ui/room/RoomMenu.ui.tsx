import { Group, Menu, MenuProps, Sx } from "@mantine/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Logout, Settings, SwitchHorizontal } from "tabler-icons-react"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import RoomModal from "../../overlays/Room.modal"

type RoomMenuProps = MenuProps & { sx?: Sx }
export function RoomMenu({ sx, children, ...props }: RoomMenuProps) {
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
    (activeRoom?.admins?.includes(auth.uid) || activeRoom?.owner === auth.uid)

  return (
    <Group position="center" sx={{ width: "100%" }}>
      <Menu {...props} withArrow position="bottom" transition="pop">
        <Menu.Target>{children}</Menu.Target>
        <Menu.Dropdown sx={sx}>
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
        </Menu.Dropdown>
      </Menu>
      {activeRoom && (
        <RoomModal data={activeRoom} opened={opened} onClose={close} />
      )}
    </Group>
  )
}
