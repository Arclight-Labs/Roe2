import {
  ActionIcon,
  Button,
  Group,
  Popover,
  Stack,
  Switch,
  Text,
} from "@mantine/core"
import { useFullscreen } from "@mantine/hooks"
import { doc, DocumentReference, updateDoc } from "firebase/firestore"
import { Rundown } from "interface/db"
import { ArrowLeft, ArrowRight, Maximize, Minimize } from "tabler-icons-react"
import { db } from "utils/firebase"
import { useAuth } from "../../context/auth/Auth.hooks"

interface Props {
  rundown: Rundown
  hiddenColumns: string[]
  toggleColumn: (column: string) => void
}
const RundownViewSettings = ({
  rundown,
  hiddenColumns,
  toggleColumn,
}: Props) => {
  const { auth } = useAuth()
  const { toggle, fullscreen } = useFullscreen()

  const move = (dir: "left" | "right") => {
    const flow = rundown.flow
    const max = rundown.flow.length - 1
    const min = 0

    const cur = rundown.flow.findIndex((f) => f.id === rundown.currentItem)
    const ref = doc(db, "rundowns", rundown.id) as DocumentReference<Rundown>

    // If there is no current item, set it to the first item in the flow
    if (cur === -1) {
      return updateDoc(ref, { currentItem: flow[min]?.id || "" })
    }

    // Move to the previous item in the flow
    if (dir === "left" && cur > 0) {
      return updateDoc(ref, { currentItem: flow[cur - 1]?.id || "" })
    }

    // Move to the next item in the flow
    if (dir === "right" && cur < max) {
      return updateDoc(ref, { currentItem: flow[cur + 1]?.id || "" })
    }
  }
  return (
    <Group align="center" position="apart">
      <Group>
        <ActionIcon onClick={toggle}>
          {fullscreen ? <Minimize /> : <Maximize />}
        </ActionIcon>
        <Popover withArrow>
          <Popover.Target>
            <Button size="xs" variant="light">
              Columns
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack spacing={0}>
              <Text size="sm">Columns</Text>
              <Switch
                checked={!hiddenColumns.includes("match")}
                onChange={() => toggleColumn("match")}
                label="Match"
                size="xs"
              />
              {rundown.columnOrder.map((column, i) => (
                <Switch
                  key={i}
                  checked={!hiddenColumns.includes(column)}
                  onChange={() => toggleColumn(column)}
                  label={rundown.columns[column]?.name || "Unknown"}
                  size="xs"
                />
              ))}
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
      {!!auth && (
        <Group>
          <Text size="xs" color="dimmed">
            {rundown.currentItem || "No item selected"}
          </Text>
          <ActionIcon size="xl" variant="light" onClick={() => move("left")}>
            <ArrowLeft />
          </ActionIcon>
          <ActionIcon size="xl" variant="light" onClick={() => move("right")}>
            <ArrowRight />
          </ActionIcon>
        </Group>
      )}
    </Group>
  )
}

export default RundownViewSettings
