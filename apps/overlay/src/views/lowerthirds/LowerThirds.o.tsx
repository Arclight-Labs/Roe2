import { Box, Image } from "@mantine/core"
import { LowerthirdData } from "interface/ws"
import { useLive, useLt } from "utils/hooks"
import LowerTicker from "./LowerTicker.o"
import { ReactNode } from "react"
import useRoom from "../../hooks/useRoom.hook"
import AdSingle from "./AdSingle.o"
import AdPool from "./AdPool.o"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { LayoutGroup } from "framer-motion"
import BG from "../../public/LTBanner.png"
import { useLTQuery } from "../../utils/useAdjQuery"

type SwitchLT = (mode: keyof LowerthirdData) => ReactNode
export interface LTProps {
  mode: keyof LowerthirdData
  isWS: boolean
}

const height = 160

const switchLT = ({ mode, isWS }: LTProps): ReactNode => {
  switch (mode) {
    case "ad":
      return <AdSingle isWS={isWS} />
    case "adPool":
      return <AdPool isWS={isWS} />
    case "matchPoll":
      return <></>
    case "ticker":
      return <LowerTicker isWS={isWS} />
    default:
      return null
  }
}

const list: Variants = {
  initial: { opacity: 0, y: height },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
}

const item: Variants = {
  initial: { opacity: 0, y: height },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: height * -1 },
}

const LowerThirds = () => {
  useRoom()
  const {
    live: {
      lt: { mode, show },
    },
  } = useLive()

  const { isWS } = useLTQuery()
  const bgImage = isWS ? "" : `url("${BG}")`

  return (
    <AnimatePresence>
      {show && (
        <LayoutGroup>
          <motion.div
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={list}
            style={{
              backgroundImage: bgImage,
              backgroundSize: "100% 100%",
              width: 1585,
              height: 300,
              padding: "55px 50px",
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
                  {switchLT({ mode, isWS })}
                </motion.div>
              </AnimatePresence>
            </Box>
          </motion.div>
        </LayoutGroup>
      )}
    </AnimatePresence>
  )
}

export default LowerThirds
