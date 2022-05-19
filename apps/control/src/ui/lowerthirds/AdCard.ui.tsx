import { Box, Card, Group, Menu, Stack, Text } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { Ad } from "interface/ws/Live.interface"
import { FC } from "react"
import { Pencil } from "tabler-icons-react"
import { adjImageStyles } from "utils/general"
import AdModal from "./AdModal.ui"

interface AdCardProps {
  ad: Ad
}
const AdCard: FC<AdCardProps> = ({ ad }) => {
  const [open, toggler] = useToggle(false, [false, true])
  const toggle = () => toggler()
  const close = () => toggler(false)
  return (
    <Card sx={{ overflow: "visible" }}>
      <Menu sx={{ position: "absolute", top: 10, right: 10 }}>
        <Menu.Item onClick={toggle} icon={<Pencil size={18} />}>
          Edit
        </Menu.Item>
      </Menu>
      <Group noWrap align="center">
        <Box {...adjImageStyles(ad.image)} />
        <Stack>
          <Text sx={{ fontSize: ad.headline.size || "inherit" }}>
            {ad.headline.text}
          </Text>
          <Text sx={{ fontSize: ad.body.size || "inherit" }}>
            {ad.body.text}
          </Text>
        </Stack>
      </Group>
      <AdModal ad={ad} opened={open} onClose={close} />
    </Card>
  )
}

export default AdCard
