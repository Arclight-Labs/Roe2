import { Box, Tabs, useMantineTheme } from "@mantine/core"
import StateActiveMatch from "./State.activeMatch"

const StatePage = () => {
  const theme = useMantineTheme()
  return (
    <Tabs
      defaultValue="activeMatch"
      styles={{
        panel: { padding: `${theme.spacing.md}px 0px` },
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="activeMatch">Active Match</Tabs.Tab>
      </Tabs.List>
      <Box py="md">
        <Tabs.Panel value="activeMatch">
          <StateActiveMatch />
        </Tabs.Panel>
      </Box>
    </Tabs>
  )
}
export default StatePage
