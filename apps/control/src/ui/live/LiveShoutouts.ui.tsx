import { Divider, Stack, Title } from "@mantine/core"
import { useLive } from "utils/hooks"
import ShoutoutsPage from "../../pages/shoutouts/Shoutouts.page"
import ShoutoutsCard from "../shoutouts/ShoutoutsCard.ui"

const LiveShoutouts = () => {
  const {
    live: { shoutouts = {} },
  } = useLive()

  return (
    <Stack pr="md">
      <Title order={5}>Selected</Title>
      <Stack>
        {Object.entries(shoutouts).map(([key, value]) => (
          <ShoutoutsCard key={key} tweet={value} withBorder shadow="xl" />
        ))}
      </Stack>
      <Divider />
      <ShoutoutsPage />
    </Stack>
  )
}

export default LiveShoutouts
