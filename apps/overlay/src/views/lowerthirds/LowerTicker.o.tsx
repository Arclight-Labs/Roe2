import React from "react"
import { useLt } from "utils/hooks"
import { Box, Stack, Text } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"

const LowerTicker = () => {
  useRoom()
  const { ticker } = useLt()
  return (
    <Stack justify={"left"} spacing={"xs"} align={"flex-start"}>
      <Text
        sx={{
          fontFamily: "Industry",
          fontSize: ticker.headline.size || 60,
          lineHeight: 1,
        }}
      >
        {ticker.headline.text}
      </Text>
      <Text
        sx={{
          fontFamily: "Roboto",
          fontSize: ticker.scrollerText.size || 40,
          lineHeight: 1,
        }}
      >
        {ticker.scrollerText.text}
      </Text>
    </Stack>
  )
}

export default LowerTicker
