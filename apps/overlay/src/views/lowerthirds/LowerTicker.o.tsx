import React from "react"
import { useLt } from "utils/hooks"
import { Box, Text } from "@mantine/core"

const LowerTicker = () => {
  const { ticker } = useLt()
  return (
    <Box>
      <Text>HELLO PLS HELP</Text>
      <Text>{ticker.headline.text}</Text>
      <Text>{ticker.scrollerText.text}</Text>
    </Box>
  )
}

export default LowerTicker
