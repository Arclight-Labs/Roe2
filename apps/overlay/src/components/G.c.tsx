import { Group, GroupProps } from "@mantine/core"
import { forwardRef, PropsWithChildren } from "react"

const G = forwardRef<HTMLDivElement, PropsWithChildren<GroupProps>>(
  ({ children, ...props }, ref) => {
    return (
      <Group spacing={0} ref={ref} {...props}>
        {children}
      </Group>
    )
  }
)

export default G
