import { Affix, Burger, Drawer, Text, Group, Kbd } from "@mantine/core"
import { useHotkeys, useToggle } from "@mantine/hooks"
import LiveDrawerContent from "./LiveDrawer.content.ui"

const LiveDrawer = () => {
  const [opened, toggle] = useToggle(false, [true, false])
  const close = () => toggle(false)

  useHotkeys([["mod+L", () => toggle()]])
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }} zIndex={999}>
        <Burger opened={opened} onClick={() => toggle()} />
      </Affix>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        padding="xl"
        size="xl"
        styles={{ drawer: { display: "flex", flexDirection: "column" } }}
        title={
          <Group noWrap spacing="xs">
            <Text>Live Settings</Text>
            <Kbd>CTRL + L</Kbd>
          </Group>
        }
      >
        <LiveDrawerContent />
      </Drawer>
    </>
  )
}

export default LiveDrawer
