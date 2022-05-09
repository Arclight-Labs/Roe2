import {
  Group,
  Stack,
  Button,
  Loader,
  TextInput,
  TextInputProps,
} from "@mantine/core"
import { useMemo, useState } from "react"
import { UserModel } from "utils/models/User.model"
import { debounce } from "lodash-es"
import { getUserByUsername } from "utils/firebase/user.queries"
import UserGroup from "./UserGroup.ui"

interface UserSearchProps extends Omit<TextInputProps, "onSelect"> {
  onSelect: (user: string[]) => void
  selected: string[]
}
const UserSelect = ({ onSelect, selected, ...props }: UserSearchProps) => {
  const [user, setUser] = useState<UserModel | undefined>()
  const [loading, setLoading] = useState(false)

  const searchUser = useMemo(() => {
    return debounce(async (input: string) => {
      setLoading(true)
      if (input.length < 1) {
        setLoading(false)
      }
      const userFound = await getUserByUsername(input)
      setUser(userFound?.data())
      setLoading(false)
    }, 400)
  }, [])

  const remove = (removeUid: string) => {
    onSelect(selected.filter((uid) => uid !== removeUid))
  }

  const selectUser = (user?: UserModel) => () => {
    if (!user) return
    onSelect([...new Set([...selected, user.uid])])
  }

  const rightSection = (
    <Group position="center">
      {loading ? (
        <Loader size={14} />
      ) : (
        <Button
          size="xs"
          disabled={!user || selected.includes(user.uid)}
          onClick={selectUser(user)}
        >
          Add
        </Button>
      )}
    </Group>
  )

  return (
    <Stack>
      <TextInput
        onChange={(e) => searchUser(e.target.value)}
        rightSection={rightSection}
        rightSectionWidth={60}
        {...props}
      />
      <UserGroup uids={selected} removeUser={remove} />
    </Stack>
  )
}

export default UserSelect
