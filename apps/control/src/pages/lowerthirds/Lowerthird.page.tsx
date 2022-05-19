import { Container, Stack, Tabs, Title } from "@mantine/core"
import LowerthirdAds from "../../ui/lowerthirds/Ads.lt.ui"
import LowerthirdTickerForm from "../../ui/lowerthirds/Ticker.lt.ui"

const LowerthirdsPage = () => {
  return (
    <Container sx={{ width: "100%" }} size="xl" title="">
      <Stack>
        <Title order={3}>Lower Thirds</Title>
        <Tabs>
          <Tabs.Tab label="Ticker">
            <LowerthirdTickerForm />
          </Tabs.Tab>
          <Tabs.Tab label="Ad Pool">
            <LowerthirdAds />
          </Tabs.Tab>
        </Tabs>
      </Stack>
    </Container>
  )
}
export default LowerthirdsPage
