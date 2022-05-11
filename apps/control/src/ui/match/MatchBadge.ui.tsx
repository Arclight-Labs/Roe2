import { ThemeIcon, Tooltip } from "@mantine/core"
import { PropsWithChildren } from "react"

interface MatchBadgeProps {
  label: string
}
const MatchBadge = ({
  label,
  children,
}: PropsWithChildren<MatchBadgeProps>) => {
  return (
    <Tooltip label={label}>
      <ThemeIcon
        variant="light"
        size="sm"
        sx={{
          opacity: 0.5,
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {children}
      </ThemeIcon>
    </Tooltip>
  )
}
export default MatchBadge
