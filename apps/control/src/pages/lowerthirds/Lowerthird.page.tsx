import { Container, Stack, Tabs, Title } from "@mantine/core"
import LowerthirdAds from "../../ui/lowerthirds/Ads.lt.ui"
import LowerthirdGeneral from "../../ui/lowerthirds/General.lt.ui"
import LowerthirdTickerForm from "../../ui/lowerthirds/Ticker.lt.ui"

const LowerthirdsPage = () => {
  return (
    <Container sx={{ width: "100%" }} size="xl" title="">
      <Stack>
        <Title order={3}>Lower Thirds</Title>
        <Tabs>
          <Tabs.List>
            <Tabs.Tab value="lt">LT State</Tabs.Tab>
            <Tabs.Tab value="ticker">Ticker</Tabs.Tab>
            <Tabs.Tab value="ad">Ad Pool</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="lt">
            <LowerthirdGeneral />
          </Tabs.Panel>
          <Tabs.Panel value="ticker">
            <LowerthirdTickerForm />
          </Tabs.Panel>
          <Tabs.Panel value="lt">
            <LowerthirdAds />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  )
}
export default LowerthirdsPage
