import { Card, CardSection, Container, Stack, Tabs, Title } from "@mantine/core"
import OverlayAll from "../../ui/overlays/OverlayAll.ui"

const OverlaysPage = () => {
  return (
    <Container sx={{ width: "100%" }} size="xl" title="">
      <Stack>
        <Title order={3}>Overlays</Title>
        <OverlayAll />
      </Stack>
    </Container>
  )
}
export default OverlaysPage
