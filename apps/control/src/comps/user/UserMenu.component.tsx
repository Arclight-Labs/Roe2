import { useState } from "react"
import { Menu, Group, MenuProps, LoadingOverlay } from "@mantine/core"
import { Logout, Settings } from "tabler-icons-react"
import { auth as firebaseAuth } from "utils/firebase"
import UserModal from "../../overlays/User.modal"
import { useAuth } from "../../context/auth/Auth.hooks"
import { signOut } from "firebase/auth"

interface Props extends Omit<MenuProps, "children"> {}
export function UserMenu(props: Props) {
  const { user, auth } = useAuth()
  const [opened, isOpened] = useState(false)
  const open = () => isOpened(true)
  const close = () => isOpened(false)
  return (
    <Group position="center">
      <Menu
        {...props}
        withArrow
        size={300}
        position="bottom"
        placement="center"
        transition="pop"
      >
        <LoadingOverlay visible={!user} />
        {user && (
          <>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item onClick={open} icon={<Settings size={14} />}>
              Account settings
            </Menu.Item>
            {/* <Menu.Item icon={<SwitchHorizontal size={14} />}>
					Change account
				</Menu.Item> */}
            <Menu.Item
              onClick={() => signOut(firebaseAuth)}
              icon={<Logout size={14} />}
            >
              Logout
            </Menu.Item>
            {/*
				<Divider />

				<Menu.Label>Danger zone</Menu.Label>
				<Menu.Item icon={<PlayerPause size={14} />}>
				Pause subscription
				</Menu.Item>
				<Menu.Item color="red" icon={<Trash size={14} />}>
				Delete account
				</Menu.Item> */}
          </>
        )}
      </Menu>
      {auth && (
        <UserModal
          user={auth}
          data={user || null}
          opened={opened}
          onClose={close}
        />
      )}
    </Group>
  )
}
