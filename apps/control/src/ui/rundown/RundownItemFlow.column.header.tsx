import { zodResolver } from "@hookform/resolvers/zod"
import {
  ActionIcon,
  Button,
  Group,
  Popover,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import {
  arrayRemove,
  deleteField,
  doc,
  DocumentReference,
  FieldPath,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { Rundown } from "interface/db"
import { useForm } from "react-hook-form"
import { Pencil, Trash } from "tabler-icons-react"
import { db } from "utils/firebase"
import {
  RundownColumnSchema,
  rundownColumnSchema,
} from "utils/schema/rundown.schema"

interface Props {
  rundown: Rundown
  columnId: string
}
const RundownItemFlowColumnHeader = ({
  rundown: { id, columns, roomId },
  columnId,
}: Props) => {
  const column = columns[columnId]

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RundownColumnSchema>({
    defaultValues: { name: column?.name || "" },
    resolver: zodResolver(rundownColumnSchema),
  })

  const save = handleSubmit(({ name }) => {
    const exists = Object.values(columns).find((col) => {
      return col.name.toLowerCase() === name.toLowerCase()
    })

    if (exists) {
      setError("name", { message: "Column name already exists" })
      return
    }

    const path = `rundowns/${id}`
    const ref = doc(db, path) as DocumentReference<Rundown>
    setDoc(
      ref,
      { columns: { [columnId]: { name } } },
      { mergeFields: [new FieldPath("columns", columnId, "name")] }
    )
  }, console.error)

  const removeColumn = () => {
    const path = `rundowns/${id}`
    const ref = doc(db, path) as DocumentReference<Rundown>
    updateDoc(ref, {
      [`columns.${columnId}`]: deleteField(),
      columnOrder: arrayRemove(columnId),
    })
  }

  return column ? (
    <th key={column.id}>
      <Group spacing="sm" noWrap>
        <Text>{column.name}</Text>
        <Popover withArrow position="bottom">
          <Popover.Target>
            <ActionIcon variant="light" size="xs">
              <Pencil size={12} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack spacing="xs">
              <TextInput
                label="Name"
                {...register("name")}
                error={errors.name?.message}
              />
              <Group position="apart" spacing="xs">
                <ActionIcon color="red" onClick={removeColumn}>
                  <Trash size={16} />
                </ActionIcon>
                <Button size="xs" variant="light" onClick={save}>
                  Save
                </Button>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </th>
  ) : null
}

export default RundownItemFlowColumnHeader
