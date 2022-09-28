import { AspectRatio, BoxProps } from "@mantine/core"
import { forwardRef } from "react"
import vs from "./vs.png"

interface Props extends BoxProps {
  size: number
}
const Versus = forwardRef<HTMLDivElement, Props>(
  ({ size = 260, ...props }, ref) => {
    return (
      <AspectRatio
        ref={ref}
        ratio={260 / 188}
        {...props}
        sx={{
          width: size,
          transform: "translateY(-30%)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("${vs}")`,
          ...props.sx,
        }}
      />
    )
  }
)

export default Versus
