import {
  ActionIcon,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core"
import { useState } from "react"
import { Plus } from "tabler-icons-react"
import { defaultUser } from "utils/general/defaultValues"
import { useLive } from "utils/hooks"
import TalentCard from "../../ui/talent/TalentCard.ui"
import TalentModal from "../../ui/talent/TalentModal.ui"

const TalentsPage = () => {
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const { talents } = useLive()
  const talentsArray = Object.entries(talents)
  return (
    <Container size="xl" sx={{ width: "100%" }}>
      <Stack>
        <Group noWrap>
          <Title order={3}>Talents</Title>
          <ActionIcon onClick={open}>
            <Plus />
          </ActionIcon>
        </Group>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {talentsArray.map(([uid, talent]) => (
            <TalentCard key={uid} data={{ ...talent, uid }} />
          ))}
        </SimpleGrid>
      </Stack>
      <TalentModal opened={opened} onClose={close} data={defaultUser} />
    </Container>
  )
}
export default TalentsPage
