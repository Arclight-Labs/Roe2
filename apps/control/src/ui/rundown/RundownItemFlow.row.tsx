import { zodResolver } from "@hookform/resolvers/zod"
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Popover,
  Stack,
  Text,
  Textarea,
  TextInput,
  TextInputProps,
} from "@mantine/core"
import { hideNotification, showNotification } from "@mantine/notifications"
import { doc, DocumentReference, setDoc } from "firebase/firestore"
import { Rundown, RundownColumn, RundownFlowItem } from "interface/db"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Menu2, Select, Trash } from "tabler-icons-react"
import { db } from "utils/firebase"
import { useMatches } from "utils/hooks"
import {
  rundownFlowItemSchema,
  RundownFlowItemSchema,
} from "utils/schema/rundown.schema"
import RundownItemFlowRowMatch from "./RundownItemFlow.row.match"

const styles: TextInputProps["styles"] = (theme) => {
  return {
    input: {
      border: "none",
      outline: "none",
      "&:focus": {
        outline: `1px solid ${theme.colors.gray[3]}}`,
      },
    },
  }
}

interface Props {
  rows: RundownFlowItem[]
  row: RundownFlowItem
  columns: RundownColumn[]
  rowNumber: number
}
const RundownItemFlowRow = ({ rows, row, columns, rowNumber }: Props) => {
  const { register, handleSubmit, reset } = useForm<RundownFlowItemSchema>({
    defaultValues: {
      columns: row.columns,
      desc: row.desc,
      matchId: row.matchId,
      title: row.title,
    },
    resolver: zodResolver(rundownFlowItemSchema),
  })
  const [matchSelectOpened, setMatchSelectOpened] = useState(false)
  const { getMatch, matches } = useMatches()
  const matchId = row.matchId
  const match = getMatch(matchId)
  const matchArr = Object.values(matches)

  useEffect(() => {
    if (!row || !reset) return
    reset({
      columns: row.columns,
      desc: row.desc,
      matchId: row.matchId,
      title: row.title,
    })
  }, [row, reset])

  const openMatchSelect = () => setMatchSelectOpened(true)
  const closeMatchSelect = () => setMatchSelectOpened(false)

  const selectMatch = (matchId: string) => {
    const path = `rundowns/${row.rundownId}`
    const ref = doc(db, path) as DocumentReference<Rundown>
    const newFlow = rows.map((r) => (r.id === row.id ? { ...r, matchId } : r))
    setDoc(ref, { flow: newFlow }, { mergeFields: ["flow"] }).then(() => {},
    console.error)
    closeMatchSelect()
  }

  const submit = handleSubmit((data) => {
    showNotification({
      id: "save",
      message: "Saving...",
      loading: true,
      autoClose: false,
      disallowClose: true,
    })
    const path = `rundowns/${row.rundownId}`
    const ref = doc(db, path) as DocumentReference<Rundown>
    const newFlow = rows.map((r) => (r.id === row.id ? { ...r, ...data } : r))
    setDoc(ref, { flow: newFlow }, { mergeFields: ["flow"] })
      .then(
        () => {},
        (err) =>
          showNotification({
            id: "save",
            message: err.message,
            loading: false,
            autoClose: true,
          })
      )
      .finally(() => hideNotification("save"))
  })

  const deleteRow = () => {
    const path = `rundowns/${row.rundownId}`
    const ref = doc(db, path) as DocumentReference<Rundown>
    const newFlow = rows.filter((r) => r.id !== row.id)
    setDoc(ref, { flow: newFlow }, { mergeFields: ["flow"] }).then(() => {},
    console.error)
  }

  return (
    <tr onBlur={submit}>
      <td style={{ width: 20 }}>{rowNumber}</td>
      <td width="auto" style={{ minWidth: 200 }}>
        <Stack spacing={5}>
          <TextInput
            size="xs"
            {...register("title")}
            placeholder="Title"
            styles={styles}
          />
          <Textarea
            size="xs"
            {...register("desc")}
            placeholder="Spiels"
            autosize
            styles={styles}
          />
        </Stack>
      </td>
      <td width="auto">
        <Group spacing="xs" noWrap>
          <Popover
            withArrow
            opened={matchSelectOpened}
            onClose={closeMatchSelect}
          >
            <Popover.Target>
              {!!match ? (
                <RundownItemFlowRowMatch
                  match={match}
                  onClick={openMatchSelect}
                />
              ) : (
                <ActionIcon onClick={openMatchSelect} size="sm" variant="light">
                  <Select size={14} />
                </ActionIcon>
              )}
            </Popover.Target>
            <Popover.Dropdown>
              <Stack spacing="xs">
                <Button
                  size="xs"
                  variant="subtle"
                  onClick={() => selectMatch("")}
                >
                  Clear
                </Button>
                {matchArr.length ? (
                  matchArr.map((match) => (
                    <RundownItemFlowRowMatch
                      onClick={() => selectMatch(`${match.id}`)}
                      key={match.id}
                      match={match}
                    />
                  ))
                ) : (
                  <Text size="sm">No matches found</Text>
                )}
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </td>
      {columns.map((column) => (
        <td key={column.id} style={{ position: "relative", minWidth: 250 }}>
          <Textarea
            {...register(`columns.${column.id}`)}
            size="xs"
            placeholder="Empty"
            styles={{
              root: {
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
              },
              wrapper: { height: "100%", padding: "10px 0" },
              input: {
                height: "100%",
                outline: "none",
                border: "none",
              },
            }}
          />
        </td>
      ))}
      <td>
        <Menu withArrow>
          <Menu.Target>
            <ActionIcon>
              <Menu2 size={14} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={deleteRow}
              color="red"
              icon={<Trash size={14} />}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  )
}

export default RundownItemFlowRow
