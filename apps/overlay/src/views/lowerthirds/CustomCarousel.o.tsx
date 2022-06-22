import { FC, PropsWithChildren } from "react"
import { motion, Transition, Variant } from "framer-motion"
interface CustomCarouselProps extends PropsWithChildren<{}> {
  animation?: AnimationProps
  transition?: Transition
}

type AnimationProps = {
  [key: string]: Variant
}

const animationDefault: AnimationProps = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
}

const transitionDefault: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 100,
}

const CustomCarousel: FC<CustomCarouselProps> = ({
  children,
  animation,
  transition,
}) => {
  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animation ?? animationDefault}
      transition={transition ?? transitionDefault}
    >
      {children}
    </motion.div>
  )
}

export default CustomCarousel
