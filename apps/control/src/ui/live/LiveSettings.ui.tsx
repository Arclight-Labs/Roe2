import { Group, Kbd, Stack, Switch, Title } from "@mantine/core"
import { useHotkeys } from "@mantine/hooks"
import { PropsWithChildren } from "react"
import { useLive } from "utils/hooks"
import { setLive } from "utils/socket/events"

const LiveSettings = () => {
  const live = useLive()

  const inverse = () => {
    setLive({ invert: !live.invert })
  }

  useHotkeys([["mod+I", inverse]])

  return (
    <Stack>
      <Section title="Quick Actions">
        <Group noWrap>
          <Switch
            checked={live.invert}
            onChange={inverse}
            label="Swap team side?"
          />
          <Kbd>CTRL</Kbd>+<Kbd>I</Kbd>
        </Group>
      </Section>
    </Stack>
  )
}

interface SectionProps {
  title: string
}
const Section = ({ title, children }: PropsWithChildren<SectionProps>) => {
  return (
    <Stack>
      <Title order={5}>{title}</Title>
      <Stack>{children}</Stack>
    </Stack>
  )
}
export default LiveSettings
