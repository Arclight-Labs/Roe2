import { Stack, Table } from "@mantine/core"
import { doc, DocumentReference } from "firebase/firestore"
import { Rundown, RundownFlowItem } from "interface/db"
import { Broadcast } from "interface/ws"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { db } from "utils/firebase"
import { defaultBroadcast } from "utils/general"
import RundownViewItem from "./RundownView.item"

type Item = RundownFlowItem & { flowNumber: number }
type Items = Record<"prev" | "curr" | "next" | "nextnext", Item | null>

interface Props {
  rundown: Rundown
  hiddenColumns: string[]
}
const RundownViewItems = ({ rundown, hiddenColumns }: Props) => {
  const ref = doc(
    db,
    "rooms",
    rundown.roomId,
    "live",
    "broadcast"
  ) as DocumentReference<Broadcast>
  const [broadcast = defaultBroadcast] = useDocumentData(ref)
  const { curr, prev, next, nextnext } = rundown.flow.reduce<Items>(
    (items, flowItem, i, arr) => {
      const { currentItem } = rundown
      const id = flowItem.id
      const index = arr.findIndex((f) => f.id === currentItem)
      if (index === -1) {
        return {
          prev: null,
          curr: arr[0] ? { ...arr[0], flowNumber: 1 } : null,
          next: arr[1] ? { ...arr[1], flowNumber: 2 } : null,
          nextnext: arr[2] ? { ...arr[2], flowNumber: 3 } : null,
        }
      }
      if (id === currentItem) {
        return {
          prev: arr[i - 1] ? { ...arr[i - 1], flowNumber: i } : null,
          curr: { ...flowItem, flowNumber: i + 1 },
          next: arr[i + 1] ? { ...arr[i + 1], flowNumber: i + 2 } : null,
          nextnext: arr[i + 2] ? { ...arr[i + 2], flowNumber: i + 3 } : null,
        }
      }
      return items
    },
    {
      curr: null,
      prev: null,
      next: null,
      nextnext: null,
    }
  )
  return (
    <Stack spacing="xs" justify="center" sx={{ height: "100%" }}>
      <Table horizontalSpacing={3} verticalSpacing={3}>
        <tbody>
          {!!prev && (
            <RundownViewItem
              status="prev"
              flowItem={prev}
              hiddenColumns={hiddenColumns}
              rundown={rundown}
              broadcast={broadcast}
            />
          )}
          <RundownViewItem
            status="curr"
            flowItem={curr}
            hiddenColumns={hiddenColumns}
            rundown={rundown}
            broadcast={broadcast}
          />
          {!!next && (
            <RundownViewItem
              status="next"
              flowItem={next}
              hiddenColumns={hiddenColumns}
              rundown={rundown}
              broadcast={broadcast}
            />
          )}
          {!!nextnext && (
            <RundownViewItem
              status="next"
              flowItem={nextnext}
              hiddenColumns={hiddenColumns}
              rundown={rundown}
              broadcast={broadcast}
            />
          )}
        </tbody>
      </Table>
    </Stack>
  )
}

export default RundownViewItems
