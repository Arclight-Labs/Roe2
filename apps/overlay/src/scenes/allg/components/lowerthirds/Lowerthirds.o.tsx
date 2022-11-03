import { Box } from "@mantine/core"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { LowerthirdData } from "interface/ws"
import { ReactNode } from "react"
import { useLt } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import AdPool from "./AdPool.o"
import AdSingle from "./AdSingle.o"
import Ticker from "./Ticker.o"

type Mode = keyof LowerthirdData
const height = 150

const switchLT = (mode: Mode): ReactNode => {
  switch (mode) {
    case "ad":
      return <AdSingle />
    case "adPool":
      return <AdPool />
    case "matchPoll":
      return <></>
    case "ticker":
      return <Ticker />
    default:
      return null
  }
}

// const list: Variants = {
//   initial: { opacity: 0, y: height },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: 0 },
// }

const item: Variants = {
  initial: { opacity: 0, y: height },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: height * -1 },
}

const LowerThirds = () => {
  useParamRoom()
  const { mode } = useLt()

  return (
    <Box
      sx={{
        backgroundSize: "100% 100%",
        width: "100vw",
        height,
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 99,
          width: "100%",
          height,
          overflow: "hidden",
        }}
      >
        <AnimatePresence>
          <motion.div
            key={mode}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={item}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
            }}
            transition={{ duration: 0.5 }}
          >
            {switchLT(mode)}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  )
}

export default LowerThirds
