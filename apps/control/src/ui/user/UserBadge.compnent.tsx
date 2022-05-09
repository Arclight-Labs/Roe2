import { ActionIcon, Avatar, Badge, Loader } from "@mantine/core"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { X } from "tabler-icons-react"
import { getUserRef } from "utils/firebase/user.queries"

interface UserChipProps {
  uid: string
  onRemove?: () => void
}
const UserBadge = ({ uid, onRemove }: UserChipProps) => {
  const [user, loading] = useDocumentData(getUserRef(uid))

  const avatar = loading ? (
    <Loader size={24} mr={5} />
  ) : (
    <Avatar src={user?.avatar} size={24} mr={5} radius="xl" />
  )

  const removeButton = onRemove ? (
    <ActionIcon
      size="xs"
      color="blue"
      radius="xl"
      variant="transparent"
      onClick={onRemove}
    >
      <X size={10} />
    </ActionIcon>
  ) : null

  return (
    <Badge
      sx={{ paddingLeft: 0, paddingRight: 3, overflow: "visible" }}
      leftSection={avatar}
      rightSection={removeButton}
      size="lg"
      radius="xl"
    >
      {loading ? "loading" : user ? user.username : "Deleted User"}
    </Badge>
  )
}

export default UserBadge
