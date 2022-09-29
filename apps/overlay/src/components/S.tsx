import { Stack, StackProps } from "@mantine/core"
import { forwardRef, PropsWithChildren } from "react"

const S = forwardRef<HTMLDivElement, PropsWithChildren<StackProps>>(
  ({ children, ...props }, ref) => {
    return (
      <Stack spacing={0} ref={ref} {...props}>
        {children}
      </Stack>
    )
  }
)

export default S
