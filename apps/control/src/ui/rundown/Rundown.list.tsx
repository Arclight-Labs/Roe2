import { uuidv4 } from "@firebase/util"
import {
  ActionIcon,
  Box,
  Card,
  Group,
  Menu,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core"
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import { Rundown } from "interface/db"
import { MouseEventHandler } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Copy, Menu2, Trash } from "tabler-icons-react"
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

  const deleteRundown = (id: string) => {
    const ref = doc(db, path, id)
    deleteDoc(ref)
  }

  const gotoRundown =
    (rundownId: string): MouseEventHandler =>
    () => {
      navigate(`/rundown/${rundownId}/edit`)
    }

  const duplicateRundown = (rundown: Rundown) => {
    const rundownId = uuidv4()
    const ref = doc(db, path, rundownId)
    setDoc(ref, {
      ...rundown,
      flow: rundown.flow.map((row) => ({ ...row, rundownId, id: uuidv4() })),
      id: rundownId,
      name: `${rundown.name} (copy)`,
    })
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
                  <Menu>
                    <Menu.Target>
                      <ActionIcon size="lg">
                        <Menu2 />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        icon={<Copy size={14} />}
                        onClick={() => duplicateRundown(rundown)}
                      >
                        Duplicate
                      </Menu.Item>
                      <Menu.Item
                        icon={<Trash size={14} />}
                        onClick={() => deleteRundown(rundown.id)}
                        color="red"
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </Card>
          ))}
    </Stack>
  )
}

export default RundownList
