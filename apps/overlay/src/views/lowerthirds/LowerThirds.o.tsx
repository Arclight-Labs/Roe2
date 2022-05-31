import { Box, Container, Image } from "@mantine/core"
import { LowerthirdData } from "interface/ws"
import { useLt } from "utils/hooks"
import LowerTicker from "./LowerTicker.o"
import { ReactNode } from "react"
import Ad from "./Ad.o"
import useRoom from "../../hooks/useRoom.hook"

type SwitchLT = (mode: keyof LowerthirdData) => ReactNode

const switchLT: SwitchLT = (mode) => {
  switch (mode) {
    case "ad":
      return <Ad />
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

const LT: SwitchLT = (mode) => {
  return (
    <div>
      {switchLT(mode)}
      <Image
        src={"/src/public/LTBanner.png"}
        sx={{ position: "absolute", top: -10, left: -20, zIndex: -1 }}
      />
    </div>
  )
}

const LowerThirds = () => {
  useRoom()
  const { mode, show } = useLt()
  return <Box sx={{ margin: "5rem" }}>{show && LT(mode)}</Box>
}

export default LowerThirds
