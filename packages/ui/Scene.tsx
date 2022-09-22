import { Box } from "@mantine/core"
import { FC, PropsWithChildren } from "react"

const Scene: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        height: 1080,
        width: 1920,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  )
}

export default Scene
