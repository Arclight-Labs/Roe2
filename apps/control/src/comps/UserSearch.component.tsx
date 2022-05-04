import {
  Group,
  Avatar,
  Text,
  MultiSelect,
  MultiSelectProps,
  MultiSelectValueProps,
  Stack,
} from "@mantine/core"
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react"
import { UserModel } from "utils/models/User.model"
import { debounce } from "lodash-es"
import { getUserRef, getUsers } from "utils/firebase/user.queries"
import { useDocumentData } from "react-firebase-hooks/firestore"
import UserBadge from "./user/UserBadge.compnent"

interface UserSearchProps {
  onSelect: (user: string[]) => void
  selected: string[]
  MultiSelectProps?: MultiSelectProps
}
const UserSearch = ({
  onSelect,
  selected,
  MultiSelectProps,
}: UserSearchProps) => {
  const [options, setOptions] = useState<UserModel[]>([])

  const searchUsers = useMemo(() => {
    return debounce((input: string) => {
      if (input.length < 1) return
      getUsers(input).then((users) => {
        console.log(users)
        setOptions(users)
      })
    }, 400)
  }, [])

  const remove = (removeUid: string) => {
    onSelect(selected.filter((uid) => uid !== removeUid))
  }

  return (
    <Stack>
      <MultiSelect
        {...MultiSelectProps}
        data={options.map((u) => ({
          value: u.uid,
          label: u.username,
          image: u.avatar,
        }))}
        searchable
        creatable
        itemComponent={SelectItem}
        onChange={onSelect}
        onSearchChange={(input) => searchUsers(input)}
        clearSearchOnBlur={false}
        label="Admins"
      />
      <Group>
        {selected.map((uid) => (
          <UserBadge key={uid} uid={uid} onRemove={() => remove(uid)} />
        ))}
      </Group>
    </Stack>
  )
}

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  label: string
  image: string
  value: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, image, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <Text>{label}</Text>
      </Group>
    </div>
  )
)

export default UserSearch
