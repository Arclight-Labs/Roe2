import { Container, Stack, Tabs, Title } from "@mantine/core"

const LowerthirdsPage = () => {
  return (
    <Container sx={{ width: "100%" }} size="xl" title="">
      <Stack>
        <Title order={3}>Lower Thirds</Title>
        <Tabs>
          <Tabs.Tab label="Ticker"></Tabs.Tab>
        </Tabs>
      </Stack>
    </Container>
  )
}
export default LowerthirdsPage
