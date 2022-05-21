import {
  Avatar,
  Box,
  Group,
  Popover,
  PopoverProps,
  SimpleGrid,
  Tooltip,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { FC } from "react"
import { useParticipants } from "utils/hooks"

interface MatchFormTeamSelectProps
  extends Omit<PopoverProps, "target" | "opened"> {
  onSelectTeam: (chalId: number | null) => void
}
const MatchFormTeamSelect: FC<MatchFormTeamSelectProps> = ({
  children,
  onSelectTeam,
  ...props
}) => {
  const [opened, toggle] = useToggle(false, [false, true])
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
      withCloseButton
      title="Select Team"
      {...props}
      target={<Box onClick={clickToggle}>{children}</Box>}
    >
      <SimpleGrid cols={4}>
        <Tooltip label="TBD">
          <Avatar onClick={onClick(null)} sx={{ cursor: "pointer" }}>
            TBD
          </Avatar>
        </Tooltip>

        {Object.entries(participants).map(([id, team]) => (
          <Tooltip label={team.name}>
            <Avatar
              src={team.logo}
              key={id}
              onClick={onClick(team.chalId || null)}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        ))}
      </SimpleGrid>
    </Popover>
  )
}
export default MatchFormTeamSelect
