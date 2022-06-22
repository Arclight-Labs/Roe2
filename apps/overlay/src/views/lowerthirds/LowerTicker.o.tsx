import { useLt } from "utils/hooks"
import { Group, Stack, Text } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"
import Marquee from "react-fast-marquee"

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
        <Marquee gradient={false} style={{ overflow: "hidden" }} speed={40}>
          <Text
            sx={{
              fontFamily: "Roboto",
              fontSize: ticker.verticalText.size || 40,
              color: "#001c5a",
              lineHeight: 1.2,
            }}
          >
            {ticker.verticalText.text}
          </Text>
        </Marquee>
        <Marquee gradient={false} style={{ overflow: "hidden" }} speed={40}>
          <Text
            sx={{
              fontFamily: "Roboto",
              fontSize: ticker.scrollerText.size || 40,
              color: "#001c5a",
              lineHeight: 1.2,
            }}
          >
            {ticker.scrollerText.text}
          </Text>
        </Marquee>
      </Stack>
    </Group>
  )
}

export default LowerTicker
