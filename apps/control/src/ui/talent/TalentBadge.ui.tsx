import { ThemeIcon, Tooltip } from "@mantine/core"
import { PropsWithChildren } from "react"

interface TalentBadgeProps {
  label: string
}
const TalentBadge = ({
  label,
  children,
}: PropsWithChildren<TalentBadgeProps>) => {
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
export default TalentBadge
