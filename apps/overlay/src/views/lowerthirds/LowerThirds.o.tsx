import { Box, Container, Image } from "@mantine/core"
import { LowerthirdData } from "interface/ws"
import { useLt } from "utils/hooks"
import LowerTicker from "./LowerTicker.o"
import { ReactNode, useState } from "react"
import useRoom from "../../hooks/useRoom.hook"
import AdSingle from "./AdSingle.o"
import AdPool from "./AdPool.o"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutGroup } from "framer-motion"

type SwitchLT = (mode: keyof LowerthirdData) => ReactNode

const switchLT: SwitchLT = (mode) => {
  switch (mode) {
    case "ad":
      return <AdSingle />
    case "adPool":
      return <AdPool />
    case "matchPoll":
      return <></>
    case "ticker":
      return <LowerTicker />
    default:
      return null
  }
}

interface SwitchAdProps {
  mode: keyof LowerthirdData
  ad?: string
}

const list = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
}

const item = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 200 },
}

const LT = ({ mode, ad }: SwitchAdProps) => {
  return (
    <div>
      <AnimatePresence>
        <motion.div
          layout
          initial="initial"
          animate="animate"
          exit="exit"
          variants={list}
        >
          <motion.div
            key={mode}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={item}
          >
            <motion.div
              key={ad}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={item}
            >
              {switchLT(mode)}
            </motion.div>
          </motion.div>
          <Image
            src={"/src/public/LTBanner.png"}
            sx={{
              position: "fixed",
              marginTop: -200,
              marginLeft: -110,
              zIndex: -10,
              minWidth: "1585px",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const LowerThirds = () => {
  useRoom()
  const {
    mode,
    show,
    data: { ad },
  } = useLt()
  return <Box sx={{ margin: "5rem" }}>{show && LT({ mode, ad })}</Box>
}

export default LowerThirds
