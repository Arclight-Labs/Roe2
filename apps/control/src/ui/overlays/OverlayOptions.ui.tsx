import {
  Accordion,
  CardSection,
  Radio,
  SegmentedControl,
  Slider,
  Stack,
  Text,
} from "@mantine/core"
import { FC } from "react"
import { OverlayLink } from "./OverlayRoutes"

export interface OverlayProps {
  overlay: [string, OverlayLink]
}

export const AdjTextOptions: FC<OverlayProps> = () => {
  return (
    <CardSection>
      <Accordion>
        <Accordion.Item value="textOptions">
          <Accordion.Panel>
            <Slider
              defaultValue={100}
              min={1}
              max={300}
              label={(value) => value.toFixed(1)}
              step={1}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </CardSection>
  )
}

const OverlayOptions: FC<OverlayProps> = ({ overlay }) => {
  return (
    <Stack>
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
          <Text sx={{ fontSize: 14 }}>🧒 Index # </Text>
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
          <Radio.Group
            label="Team Code"
            size="sm"
            orientation="vertical"
            defaultValue="name"
          >
            <Radio value="name" label="Team Name" />
            <Radio value="shortcode" label="Team Short Code" />
            <Radio value="shortname" label="Team Short Name" />
            <Radio value="school" label="School Name" />
            <Radio value="schoolShortcode" label="School Short Code" />
          </Radio.Group>
        </CardSection>
      )}

      {overlay[1].adjust?.playerCode && (
        <CardSection>
          <Radio.Group orientation="vertical" defaultValue="username">
            <Radio value="username" label="Username" />
            <Radio value="school" label="School" />
            <Radio value="photoURL" label="Photo" />
          </Radio.Group>
        </CardSection>
      )}

      {JSON.stringify(overlay[1].adjust?.statIndex) && (
        <CardSection>
          <Text sx={{ fontSize: 14 }}>🔢 Stats # </Text>
          <Slider
            defaultValue={0}
            min={0}
            max={10}
            label={(value) => value.toFixed(1)}
            step={1}
          />
        </CardSection>
      )}

      {overlay[1].adjust?.adjText && <AdjTextOptions overlay={overlay} />}
    </Stack>
  )
}

export default OverlayOptions
