import React from "react"
import Ticker from "react-ticker"
import { useLt } from "utils/hooks"
import { Box, Text } from "@mantine/core"

const LowerTicker = () => {
  const { ticker } = useLt()
  return (
    <Box>
      <Text>HELLO PLS HELP</Text>
      <Text>{ticker.headline.text}</Text>
      <Text>{ticker.scrollerText.text}</Text>
      {/* <Ticker>
        {({ index }) => (
          <>
            <Text>{ticker.headline.text}</Text>
            <Text>{ticker.scrollerText.text}</Text>
          </>
        )}
      </Ticker> */}
    </Box>
  )
}

export default LowerTicker
