import { FC } from "react"
import { motion } from "framer-motion"

interface CarouselProps {
  adKey: string
  children?: React.ReactNode
}
const item = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 200 },
}

const CustomCarousel: FC<CarouselProps> = ({ children, adKey }) => {
  return (
    <motion.div
      key={adKey}
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
