import { useLt } from "utils/hooks"
import { Group, Stack, Text } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"

const LowerTicker = () => {
  useRoom()
  const { ticker } = useLt()
  return (
    <Group align="center">
      <Stack justify="center" spacing="xs" align="center">
        <Text
          sx={{
            fontFamily: "Industry",
            fontSize: ticker.headline.size || 60,
            color: "#001c5a",
            lineHeight: 1,
          }}
        >
          {ticker.headline.text}
        </Text>
        <Text
          sx={{
            fontFamily: "Roboto",
            fontSize: ticker.scrollerText.size || 40,
            color: "#001c5a",
            lineHeight: 1,
          }}
        >
          {ticker.scrollerText.text}
        </Text>
      </Stack>
    </Group>
  )
}

export default LowerTicker
