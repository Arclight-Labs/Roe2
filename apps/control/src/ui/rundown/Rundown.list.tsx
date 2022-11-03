import {
  ActionIcon,
  Box,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core"
import {
  collection,
  CollectionReference,
  query,
  where,
} from "firebase/firestore"
import { Rundown } from "interface/db"
import { MouseEventHandler } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Menu2 } from "tabler-icons-react"
import { db } from "utils/firebase"

interface Props {
  roomId: string
}
const RundownList = ({ roomId }: Props) => {
  const navigate = useNavigate()
  const path = `rundowns`
  const ref = collection(db, path) as CollectionReference<Rundown>
  const q = query(ref, where("roomId", "==", roomId))
  const [data = [], loading] = useCollectionData(q)

  const gotoRundown =
    (rundownId: string): MouseEventHandler =>
    () => {
      navigate(`/rundown/${rundownId}/edit`)
    }
  return (
    <Stack spacing="xs">
      {loading
        ? new Array(3)
            .fill(true)
            .map((_, i) => <Skeleton key={i} height={75} />)
        : data.map((rundown) => (
            <Card key={rundown.id} withBorder>
              <Group position="apart">
                <Group>
                  <Box
                    sx={(theme) => ({
                      height: 50,
                      width: 50,
                      borderRadius: 5,
                      border: `1px solid ${theme.colors.gray[3]}`,
                      backgroundImage: `url("${rundown.image}")`,
                      backgroundSize: "contain",
                      bakcgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    })}
                  />
                  <Stack spacing={0}>
                    <Text size="md">{rundown.name}</Text>
                    <Text size="sm" color="dimmed">
                      {rundown.desc}
                    </Text>
                  </Stack>
                </Group>
                <Group spacing="xs">
                  <ActionIcon size="lg" onClick={gotoRundown(rundown.id)}>
                    <ArrowRight />
                  </ActionIcon>
                  <ActionIcon size="lg">
                    <Menu2 />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
    </Stack>
  )
}

export default RundownList
