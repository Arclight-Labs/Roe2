import { Group, GroupProps } from "@mantine/core"
import UserBadge from "./UserBadge.ui"

interface UserGroupProps extends GroupProps {
  uids: string[]
  removeUser: (uid: string) => void
}
const UserGroup = ({ uids, removeUser, ...props }: UserGroupProps) => {
  return (
    <Group {...props}>
      {uids.map((uid) => (
        <UserBadge key={uid} uid={uid} onRemove={() => removeUser(uid)} />
      ))}
    </Group>
  )
}

export default UserGroup
