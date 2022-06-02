import {
  Card,
  CardSection,
  Text,
  TextInput,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core"
import { FC, useState } from "react"
import OverlayRoutes, { OverlayLink } from "./OverlayRoutes"
import { useClipboard } from "@mantine/hooks"
import { useRoom } from "../../context/room/Room.hooks"
import { Clipboard, ClipboardCheck } from "tabler-icons-react"

interface OverlayProps {
  overlay: [string, OverlayLink]
}

const OverlayCard: FC<OverlayProps> = ({ overlay }) => {
  const roomID = useRoom()?.id
  const link = `${roomID}${overlay[1].link}`
  const [linkValue, setLinkValue] = useState(link)
  const clipboard = useClipboard({ timeout: 500 })

  return (
    <Card shadow="sm">
      <CardSection>
        <Group>
          <TextInput disabled label={overlay[0]} value={linkValue}></TextInput>

          <ActionIcon
            color={clipboard.copied ? "teal" : "gray"}
            onClick={() => clipboard.copy(linkValue)}
          >
            {clipboard.copied ? <ClipboardCheck /> : <Clipboard />}
          </ActionIcon>
        </Group>
      </CardSection>
    </Card>
  )
}

export default OverlayCard
