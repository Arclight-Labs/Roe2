import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { doc, DocumentReference } from "firebase/firestore"
import { Rundown } from "interface/db"
import { useState } from "react"
import { useDocument } from "react-firebase-hooks/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowRight } from "tabler-icons-react"
import { db } from "utils/firebase"
import RundownModalForm from "./Rundown.form"
import RundownItemFlowList from "./RundownItemFlow.list"

const RundownContent = () => {
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const { rundownId = "" } = useParams() as { rundownId: string }
  const path = `rundowns/${rundownId}`
  const ref = doc(db, path) as DocumentReference<Rundown>
  const [snap, loading] = useDocument(ref)
  const data = snap?.data()

  const nav = useNavigate()
  const gotoRundown = () => {
    nav(`/rundown/${rundownId}`)
  }

  return data ? (
    <Stack spacing="xl">
      <Group position="apart">
        <Group>
          <Box
            sx={(theme) => ({
              height: 50,
              width: 50,
              backgroundImage: `url("${data?.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 5,
              border: `1px solid ${theme.colors.gray[3]}`,
            })}
          />
          <Stack spacing={0}>
            <Title order={4}>{data?.name}</Title>
            <Text size="sm">{data?.desc}</Text>
          </Stack>
        </Group>
        <Group>
          <ActionIcon variant="light" onClick={gotoRundown}>
            <ArrowRight />
          </ActionIcon>
          <Button size="xs" onClick={open}>
            Edit
          </Button>
        </Group>
      </Group>
      <Divider />
      <RundownItemFlowList rundown={data} />
      <RundownModalForm rundown={data} onClose={close} opened={opened} />
    </Stack>
  ) : loading ? (
    <Skeleton height={50} />
  ) : (
    <Text>No data</Text>
  )
}

export default RundownContent
