import { Tabs } from "@mantine/core"
import LowerthirdAds from "../lowerthirds/Ads.lt.ui"
import RoomSelect from "../RoomSelect.ui"
import LiveMatches from "./LiveMatches.ui"
import LiveSettings from "./LiveSettings.ui"
import LiveShoutouts from "./LiveShoutouts.ui"

const LiveDrawerContent = () => {
  return (
    <Tabs
      styles={{
        root: {
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100% - 50px)",
        },
        panel: {
          padding: "20px 0 50px 0",
          height: "100%",
          overflowY: "auto",
        },
      }}
      defaultValue="live"
    >
      <Tabs.List>
        <Tabs.Tab value="live">Live</Tabs.Tab>
        <Tabs.Tab value="matches">Matches</Tabs.Tab>
        <Tabs.Tab value="shoutouts">Shoutouts</Tabs.Tab>
        <Tabs.Tab value="ads">Ads</Tabs.Tab>
        <Tabs.Tab value="rooms">Rooms</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="live">
        <LiveSettings />
      </Tabs.Panel>
      <Tabs.Panel value="matches">
        <LiveMatches />
      </Tabs.Panel>
      <Tabs.Panel value="shoutouts">
        <LiveShoutouts />
      </Tabs.Panel>
      <Tabs.Panel value="ads">
        <LowerthirdAds />
      </Tabs.Panel>
      <Tabs.Panel value="rooms">
        <RoomSelect small />
      </Tabs.Panel>
    </Tabs>
  )
}

export default LiveDrawerContent
