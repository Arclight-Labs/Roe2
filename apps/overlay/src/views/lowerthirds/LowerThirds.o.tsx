import { Box, Container } from "@mantine/core"
import { LowerthirdData } from "interface/ws"
import { useLt } from "utils/hooks"
import LowerTicker from "./LowerTicker.o"
import { ReactNode } from "react"

type SwitchLT = (mode: keyof LowerthirdData) => ReactNode

const switchLT: SwitchLT = (mode) => {
  switch (mode) {
    case "ad":
      return <></>
    case "adPool":
      return <></>
    case "matchPoll":
      return <></>
    case "ticker":
      return <LowerTicker />
    default:
      return null
  }
}

const LowerThirds = () => {
  const { mode, show } = useLt()
  return <Container>{show && switchLT(mode)}</Container>
}

export default LowerThirds
