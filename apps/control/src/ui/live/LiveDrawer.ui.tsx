import {
  Affix,
  Burger,
  Drawer,
  Text,
  TabsProps,
  Tabs,
  Group,
  Kbd,
} from "@mantine/core"
import { useHotkeys, useToggle } from "@mantine/hooks"
import { useState } from "react"
import LiveMatches from "./LiveMatches.ui"
import LiveSettings from "./LiveSettings.ui"
import LiveShoutouts from "./LiveShoutouts.ui"

const LiveDrawer = () => {
  const [tab, setTab] = useState(0)

  const [opened, toggle] = useToggle(false, [true, false])
  const close = () => toggle(false)

  const onTabChange: TabsProps["onTabChange"] = (index) => {
    setTab(index)
  }

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
            <Kbd>CTRL</Kbd>+<Kbd>L</Kbd>
          </Group>
        }
      >
        <DrawerContent {...{ tab, onTabChange }} />
      </Drawer>
    </>
  )
}

interface DrawerContentProps {
  tab: number
  onTabChange: TabsProps["onTabChange"]
}
const DrawerContent = ({ tab, onTabChange }: DrawerContentProps) => {
  return (
    <Tabs
      active={tab}
      onTabChange={onTabChange}
      styles={{
        root: {
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100% - 50px)",
        },
        body: {
          padding: "20px 0 50px 0",
          overflowY: "scroll",
        },
      }}
    >
      <Tabs.Tab label="Live">
        <LiveSettings />
      </Tabs.Tab>
      <Tabs.Tab label="Matches">
        <LiveMatches />
      </Tabs.Tab>
      <Tabs.Tab label="Shoutouts">
        <LiveShoutouts />
      </Tabs.Tab>
    </Tabs>
  )
}
export default LiveDrawer
