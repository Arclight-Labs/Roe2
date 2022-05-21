import { Stack, Title } from "@mantine/core"
import { useLive } from "utils/hooks"
import ShoutoutsCard from "../shoutouts/ShoutoutsCard.ui"

const LiveShoutouts = () => {
  const {
    live: { shoutouts = {} },
  } = useLive()

  return (
    <Stack pr="md">
      <Title order={5}>Shoutouts</Title>
      <Stack>
        {Object.entries(shoutouts).map(([key, value]) => (
          <ShoutoutsCard key={key} tweet={value} withBorder shadow="xl" />
        ))}
      </Stack>
    </Stack>
  )
}

export default LiveShoutouts
