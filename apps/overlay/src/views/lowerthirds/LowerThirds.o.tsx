import { Box } from "@mantine/core"
import { AnimatePresence, LayoutGroup, motion, Variants } from "framer-motion"
import { LowerthirdData } from "interface/ws"
import { ReactNode } from "react"
import { useLive } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import BG from "../../public/LTBanner.png"
import { useLTQuery } from "../../utils/useAdjQuery"
import AdPool from "./AdPool.o"
import AdSingle from "./AdSingle.o"
import LowerTicker from "./LowerTicker.o"
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
  useParamRoom()
  const {
    live: {
      lt: { mode, show },
    },
  } = useLive()

  const { isWS } = useLTQuery()
  const bgImage = isWS ? "" : `url("${BG}")`

  return (
    <div>
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
    </div>
  )
}

export default LowerThirds
