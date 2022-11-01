import { uuidv4 } from "@firebase/util"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Popover,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import {
  arrayUnion,
  doc,
  DocumentReference,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { Rundown, RundownColumn, RundownFlowItem } from "interface/db"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Plus } from "tabler-icons-react"
import { db } from "utils/firebase"
import {
  RundownColumnSchema,
  rundownColumnSchema,
} from "utils/schema/rundown.schema"
import RundownItemFlowColumnHeader from "./RundownItemFlow.column.header"
import RundownItemFlowRow from "./RundownItemFlow.row"

interface Props {
  rundown: Rundown
}
const RundownItemFlowList = ({ rundown }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RundownColumnSchema>({
    defaultValues: { name: "" },
    resolver: zodResolver(rundownColumnSchema),
  })

  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)

  const addItem = () => {
    const path = `rundowns/${rundown.id}`
    const ref = doc(db, path) as DocumentReference<Rundown>
    const newItem: RundownFlowItem = {
      rundownId: rundown.id,
      roomId: rundown.roomId,
      id: uuidv4(),
      title: "",
      desc: "",
      matchId: "",
      textColor: "",
      backgroundColor: "",
      columns: {},
    }
    try {
      setDoc(ref, { flow: [...rundown.flow, newItem] }, { merge: true })
    } catch {
      showNotification({ message: "Error adding item" })
    }
  }

  const columns = Object.values(rundown.columns)

  const addColumn = handleSubmit(({ name }) => {
    if (columns.find((c) => c.name === name)) {
      setError("name", { message: "Column name already exists" })
      return
    }

    const path = `rundowns/${rundown.id}`
    const ref = doc(db, path) as DocumentReference<Rundown>
    const columnId = uuidv4()
    const data: RundownColumn = {
      id: columnId,
      name,
      hidden: false,
      backgroundColor: "",
      textColor: "",
    }

    const finalize = () => {
      close()
      reset()
    }

    updateDoc(ref, {
      [`columns.${columnId}`]: data,
      columnOrder: arrayUnion(columnId),
    })
      .then(finalize)
      .catch(() => setError("name", { message: "Error adding column" }))
  }, console.error)

  const ths = (
    <tr>
      <th style={{ width: 20 }}></th>
      <th>Title</th>
      <th>Match</th>
      {rundown.columnOrder.map((column) => (
        <RundownItemFlowColumnHeader
          key={column}
          rundown={rundown}
          columnId={column}
        />
      ))}
      <th style={{ width: 20 }}>
        <Popover opened={opened} onOpen={open} onClose={close}>
          <Popover.Target>
            <ActionIcon onClick={open}>
              <Plus size={16} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack spacing="xs">
              <TextInput
                {...register("name")}
                label="Name"
                error={errors.name?.message}
              />
              <Group position="right" spacing="xs">
                <Button onClick={close} color="cyan" variant="subtle" size="xs">
                  Cancel
                </Button>
                <Button onClick={addColumn} variant="light" size="xs">
                  Add Column
                </Button>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </th>
    </tr>
  )

  const rows = rundown.flow.map((item, i, arr) => (
    <RundownItemFlowRow
      rows={arr}
      rowNumber={i + 1}
      columns={columns}
      row={item}
      key={item.id}
    />
  ))

  return (
    <Stack>
      <Title order={5}>Rundown</Title>
      <Stack spacing="xs" sx={{}}>
        <Card radius="md" withBorder sx={{ overflowX: "auto" }}>
          <Table withColumnBorders horizontalSpacing="lg" verticalSpacing="sm">
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
            <tfoot>
              <tr>
                <th style={{ width: 20 }}>
                  <ActionIcon onClick={addItem}>
                    <Plus size={16} />
                  </ActionIcon>
                </th>
                <th colSpan={columns.length + 3}></th>
              </tr>
            </tfoot>
          </Table>
        </Card>
      </Stack>
    </Stack>
  )
}

export default RundownItemFlowList
