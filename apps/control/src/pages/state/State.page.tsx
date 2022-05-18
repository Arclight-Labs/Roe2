import { Tabs, useMantineTheme } from "@mantine/core"
import StateActiveMatch from "./State.activeMatch"

const StatePage = () => {
  const theme = useMantineTheme()
  return (
    <Tabs
      styles={{
        body: {
          padding: `${theme.spacing.md}px 0px`,
        },
      }}
    >
      <Tabs.Tab label="Active Match">
        <StateActiveMatch />
      </Tabs.Tab>
    </Tabs>
  )
}
export default StatePage
