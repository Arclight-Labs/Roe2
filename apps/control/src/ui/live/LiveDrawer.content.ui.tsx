import { TabsProps, Tabs } from "@mantine/core"
import { useState } from "react"
import LiveMatches from "./LiveMatches.ui"
import LiveSettings from "./LiveSettings.ui"
import LiveShoutouts from "./LiveShoutouts.ui"

const LiveDrawerContent = () => {
  const onTabChange: TabsProps["onTabChange"] = (index) => {
    setTab(index)
  }
  const [tab, setTab] = useState(0)

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
          height: "100%",
          overflowY: "auto",
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

export default LiveDrawerContent
