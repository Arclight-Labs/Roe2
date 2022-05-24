import { Box, Container } from "@mantine/core"
import { useLt } from "utils/hooks"
import LowerTicker from "./LowerTicker.o"

const LowerThirds = () => {
  const { mode, show } = useLt()
  return (
    <Container>
      {show ? (
        mode === "ad" ? (
          <LowerTicker></LowerTicker>
        ) : (
          <LowerTicker></LowerTicker>
        )
      ) : (
        <></>
      )}
    </Container>
  )
}

export default LowerThirds
