import {
  Avatar,
  Box,
  Popover,
  PopoverDropdownProps,
  PopoverProps,
  PopoverTargetProps,
  SimpleGrid,
  Tooltip,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { FC } from "react"
import { useParticipants } from "utils/hooks"

interface MatchFormTeamSelectProps
  extends Omit<PopoverProps, "target" | "opened"> {
  onSelectTeam: (chalId: number | null) => void
  disabled?: boolean
  targetProps?: PopoverTargetProps
  dropdownProps?: PopoverDropdownProps
}
const MatchFormTeamSelect: FC<MatchFormTeamSelectProps> = ({
  children,
  onSelectTeam,
  disabled,
  dropdownProps,
  targetProps,
  ...props
}) => {
  const [opened, toggle] = useToggle([false, true])
  const close = () => toggle(false)
  const clickToggle = () => toggle()
  const { participants } = useParticipants()
  const onClick = (chalId: number | null) => async () => {
    close()
    onSelectTeam(chalId)
  }

  return (
    <Popover
      opened={opened}
      onClose={close}
      position="top"
      withArrow
      {...props}
    >
      <Popover.Target {...targetProps}>
        <Box onClick={!disabled ? clickToggle : undefined}>{children}</Box>
      </Popover.Target>
      <Popover.Dropdown {...dropdownProps}>
        <SimpleGrid cols={4} spacing="xs">
          <Tooltip label="TBD">
            <Avatar onClick={onClick(null)} sx={{ cursor: "pointer" }}>
              TBD
            </Avatar>
          </Tooltip>

          {Object.entries(participants).map(([id, team]) => (
            <Tooltip label={team.name} key={id}>
              <Avatar
                src={team.logo}
                key={id}
                onClick={onClick(team.chalId || null)}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
          ))}
        </SimpleGrid>
      </Popover.Dropdown>
    </Popover>
  )
}
export default MatchFormTeamSelect
