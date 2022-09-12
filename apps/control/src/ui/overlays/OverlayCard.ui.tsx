import {
  ActionIcon,
  Card,
  CardSection,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import { FC, useState } from "react"
import Marquee from "react-fast-marquee"
import {
  ArrowUpRightCircle,
  Clipboard,
  ClipboardCheck,
} from "tabler-icons-react"
import { useRoom } from "../../context/room/Room.hooks"
import OverlayOptions, { OverlayProps } from "./OverlayOptions.ui"

const OverlayCard: FC<OverlayProps> = ({ overlay }) => {
  const roomID = useRoom()?.id
  const link = `overlay.acadarena.com/${roomID}${overlay[1].link}`
  const [linkValue, setLinkValue] = useState(link)
  const clipboard = useClipboard({ timeout: 500 })

  const onClickOverlay = () => {
    window.open(`https://${linkValue}`)
  }
  return (
    <Card shadow="sm" sx={{ maxWidth: 300 }}>
      <Stack>
        <Group sx={{ justifyContent: "space-between" }}>
          <Title order={4}>{overlay[0]}</Title>
          <Group noWrap spacing={2}>
            <ActionIcon
              color={clipboard.copied ? "teal" : "gray"}
              onClick={() => clipboard.copy(linkValue)}
            >
              {clipboard.copied ? <ClipboardCheck /> : <Clipboard />}
            </ActionIcon>
            <ActionIcon onClick={onClickOverlay}>
              <ArrowUpRightCircle />
            </ActionIcon>
          </Group>
        </Group>
        <CardSection>
          <Group noWrap>
            {overlay[1].icon}
            <Marquee gradient={false} speed={40}>
              <Group sx={{ marginRight: 20 }}>
                <Text sx={{ opacity: "40%" }}>🚀</Text>
                <Text sx={{ opacity: "40%" }}>{linkValue} </Text>
              </Group>
            </Marquee>
          </Group>
        </CardSection>
        <OverlayOptions overlay={overlay} />
      </Stack>
    </Card>
  )
}

export default OverlayCard
