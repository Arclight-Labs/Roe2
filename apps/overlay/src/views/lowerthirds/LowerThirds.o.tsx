import { Box, Container } from "@mantine/core"
import { useLt } from "utils/hooks"
import LowerTicker from "./LowerTicker.o"

const switchLT = (mode: string) => {
  switch (mode) {
    case "ad":
      return <></>
    case "adPool":
      return <></>
    case "matchPoll":
      return <></>
    case "ticker":
      return <LowerTicker></LowerTicker>
  }
}

const LowerThirds = () => {
  const { mode, show } = useLt()
  return (
    <Container>
      {/* <LowerTicker></LowerTicker> */}
      {show ? switchLT(mode) : <></>}
    </Container>
  )
}

export default LowerThirds
