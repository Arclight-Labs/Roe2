import { useState } from "react"
import { Menu, Group, MenuProps, LoadingOverlay } from "@mantine/core"
import { Logout, Settings } from "tabler-icons-react"
import { auth as firebaseAuth } from "utils/firebase"
import UserModal from "../../overlays/User.modal"
import { useAuth } from "../../context/auth/Auth.hooks"
import { signOut } from "firebase/auth"

type Props = Omit<MenuProps, "children">
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
            <Menu.Item
              onClick={() => signOut(firebaseAuth)}
              icon={<Logout size={14} />}
            >
              Logout
            </Menu.Item>
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
