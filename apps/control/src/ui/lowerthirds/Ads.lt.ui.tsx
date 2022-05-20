import { ActionIcon, Group, Stack, Title } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { Plus } from "tabler-icons-react"
import { defaultAd } from "utils/general/defaultValues"
import { useLt } from "utils/hooks"
import AdCard from "./AdCard.ui"
import AdModal from "./AdModal.ui"

const LowerthirdAds = () => {
  const { adPool } = useLt()
  const [create, toggler] = useToggle(false, [false, true])
  const close = () => toggler(false)
  const toggle = () => toggler()

  return (
    <Stack mt="lg">
      <Group noWrap>
        <Title order={5}>Advertisement Pool</Title>
        <ActionIcon variant="light" onClick={toggle}>
          <Plus />
        </ActionIcon>
      </Group>
      <Stack>
        {adPool.ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </Stack>
      <AdModal opened={create} onClose={close} ad={defaultAd} />
    </Stack>
  )
}

export default LowerthirdAds
