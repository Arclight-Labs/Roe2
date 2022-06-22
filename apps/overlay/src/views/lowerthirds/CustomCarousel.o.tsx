import { FC, PropsWithChildren } from "react"
import { motion } from "framer-motion"

const item = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
}

const CustomCarousel: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={item}
    >
      {children}
    </motion.div>
  )
}

export default CustomCarousel
