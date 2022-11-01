import {
  Center,
  LoadingOverlay,
  MantineProvider,
  Stack,
  Text,
} from "@mantine/core"
import { doc, DocumentReference } from "firebase/firestore"
import { Rundown } from "interface/db"
import { useState } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useParams } from "react-router-dom"
import { db } from "utils/firebase"
import RundownViewItems from "../../ui/rundown_view/RundownView.items"
import RundownViewSettings from "../../ui/rundown_view/RundownView.settings"

const RundownView = () => {
  const { rundownId = "" } = useParams() as Record<"rundownId", string>
  const ref = doc(db, "rundowns", rundownId) as DocumentReference<Rundown>
  const [rundown, loading] = useDocumentData(ref)
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])

  const hideColumn = (column: string) => {
    setHiddenColumns((prev) => Array.from(new Set([...prev, column])))
  }

  const showColumn = (column: string) => {
    setHiddenColumns((prev) => prev.filter((c) => c !== column))
  }

  const toggleColumn = (column: string) => {
    if (hiddenColumns.includes(column)) {
      return showColumn(column)
    }
    return hideColumn(column)
  }

  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <Stack p="sm" sx={{ width: "100vw", height: "100vh" }}>
        {loading ? (
          <LoadingOverlay visible />
        ) : rundown ? (
          <Stack sx={{ height: "100%" }} justify="space-between">
            <RundownViewItems rundown={rundown} hiddenColumns={hiddenColumns} />
            <RundownViewSettings
              rundown={rundown}
              hiddenColumns={hiddenColumns}
              toggleColumn={toggleColumn}
            />
          </Stack>
        ) : (
          <Center>
            <Text>Rundown not found</Text>
          </Center>
        )}
      </Stack>
    </MantineProvider>
  )
}

export default RundownView
