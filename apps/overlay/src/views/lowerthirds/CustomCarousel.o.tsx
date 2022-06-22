import { FC, PropsWithChildren } from "react"
import { motion, Variant } from "framer-motion"
interface CustomCarouselProps extends PropsWithChildren<{}> {
  animation?: AnimationProps
}

type AnimationProps = {
  [key: string]: Variant
}

const animationDefault: AnimationProps = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
}

const CustomCarousel: FC<CustomCarouselProps> = ({ children, animation }) => {
  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animation ?? animationDefault}
    >
      {children}
    </motion.div>
  )
}

export default CustomCarousel
