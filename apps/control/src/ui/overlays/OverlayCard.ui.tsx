import {
  Card,
  CardSection,
  Text,
  TextInput,
  Button,
  Group,
  ActionIcon,
  Title,
  Slider,
  SegmentedControl,
  RadioGroup,
  Radio,
} from "@mantine/core"
import { FC, useState } from "react"
import { OverlayLink } from "./OverlayRoutes"
import { useClipboard } from "@mantine/hooks"
import { useRoom } from "../../context/room/Room.hooks"
import {
  ArrowUpRightCircle,
  Clipboard,
  ClipboardCheck,
} from "tabler-icons-react"

interface OverlayProps {
  overlay: [string, OverlayLink]
}

const OverlayCard: FC<OverlayProps> = ({ overlay }) => {
  const roomID = useRoom()?.id
  const link = `overlay.acadarena.com/${roomID}${overlay[1].link}`
  const [linkValue, setLinkValue] = useState(link)
  const clipboard = useClipboard({ timeout: 500 })

  const onClickOverlay = () => {
    window.open(`https://${linkValue}`)
  }
  return (
    <Card shadow="sm">
      <Title order={4}>{overlay[0]}</Title>
      <CardSection>
        <Group>
          <TextInput sx={{ width: 500 }} disabled value={linkValue}></TextInput>
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
      </CardSection>
      {overlay[1].adjust?.team && (
        <CardSection>
          <SegmentedControl
            data={[
              { label: "Team A", value: "a" },
              { label: "Team B", value: "b" },
            ]}
          />
        </CardSection>
      )}
      {JSON.stringify(overlay[1].adjust?.index) && (
        <CardSection>
          <Slider
            defaultValue={0}
            min={0}
            max={10}
            label={(value) => value.toFixed(1)}
            step={1}
          />
        </CardSection>
      )}
      {overlay[1].adjust?.teamCode && (
        <CardSection>
          <RadioGroup orientation="vertical" defaultValue="name">
            <Radio value="name" label="Team Name" />
            <Radio value="shortcode" label="Team Short Code" />
            <Radio value="shortname" label="Team Short Name" />
            <Radio value="school" label="School Name" />
            <Radio value="schoolShortcode" label="School Short Code" />
          </RadioGroup>
        </CardSection>
      )}

      {overlay[1].adjust?.playerCode && (
        <CardSection>
          <RadioGroup orientation="vertical" defaultValue="username">
            <Radio value="username" label="Username" />
            <Radio value="school" label="School" />
            <Radio value="photoURL" label="Photo" />
          </RadioGroup>
        </CardSection>
      )}

      {JSON.stringify(overlay[1].adjust?.statIndex) && (
        <CardSection>
          <Slider
            defaultValue={0}
            min={0}
            max={10}
            label={(value) => value.toFixed(1)}
            step={1}
          />
        </CardSection>
      )}
    </Card>
  )
}

export default OverlayCard
