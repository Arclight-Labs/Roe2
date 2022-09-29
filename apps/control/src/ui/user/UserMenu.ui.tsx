import {
  Group,
  LoadingOverlay,
  Menu,
  MenuDropdownProps,
  MenuProps,
  MenuTargetProps,
} from "@mantine/core"
import { signOut } from "firebase/auth"
import { useState } from "react"
import { Logout, Settings } from "tabler-icons-react"
import { auth as firebaseAuth } from "utils/firebase"
import { useAuth } from "../../context/auth/Auth.hooks"
import UserModal from "../../overlays/User.modal"

interface Props extends MenuProps {
  dropdownProps?: MenuDropdownProps
  targetProps?: MenuTargetProps
}
export function UserMenu({
  children,
  dropdownProps,
  targetProps,
  ...props
}: Props) {
  const { user, auth } = useAuth()
  const [opened, isOpened] = useState(false)
  const open = () => isOpened(true)
  const close = () => isOpened(false)
  return (
    <Group position="center">
      <Menu
        {...props}
        withArrow
        position="bottom"
        transition="pop"
        withinPortal
      >
        <Menu.Target {...targetProps}>{children}</Menu.Target>
        <Menu.Dropdown {...dropdownProps}>
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
        </Menu.Dropdown>
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
