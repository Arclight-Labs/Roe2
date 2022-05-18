import {
  ActionIcon,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core"
import { useState } from "react"
import { ArrowUpRightCircle, Plus, Speakerphone } from "tabler-icons-react"
import { defaultUser } from "utils/general/defaultValues"
import { useLive } from "utils/hooks"
import TalentCard from "../../ui/talent/TalentCard.ui"
import TalentModal from "../../ui/talent/TalentModal.ui"
import { Text } from "@mantine/core"

const TalentsPage = () => {
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const { live } = useLive()
  const talentsArray = Object.entries(live.talents)
  const activeTalentsArray = Object.entries(live.activeTalents)
  return (
    <Container size="xl" sx={{ width: "100%" }}>
      <Stack>
        <Group noWrap>
          <Title order={3}>Talents</Title>
          <ActionIcon onClick={open}>
            <Plus />
          </ActionIcon>
        </Group>
        <Group noWrap>
          <ActionIcon>
            <ArrowUpRightCircle />
          </ActionIcon>
          <Title order={5}>Active Casters</Title>
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
          {activeTalentsArray.map(([uid, talent]) => (
            <TalentCard key={uid} data={{ ...talent, uid }} />
          ))}
        </SimpleGrid>
        <Divider my="md" />
        <Group noWrap>
          <ActionIcon>
            <Speakerphone />
          </ActionIcon>
          <Title order={5}>Caster Pool</Title>
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
