import { Avatar, Group, GroupProps, Stack, Text, Tooltip } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { useScreen } from "ui/Screen.hook"

interface TeamProps extends GroupProps {
  team: SanitizedParticipant
  loser?: boolean
  small?: boolean
}
const MatchCardTeam = ({ team, loser, small, ...props }: TeamProps) => {
  const { xs } = useScreen()

  const TextDetails = (
    <Stack spacing={0}>
      <Text lineClamp={1} sx={{ lineHeight: small ? 1 : "initial" }}>
        {team.shortcode || team.shortname || team.name}
      </Text>
      <Text size="xs" lineClamp={1}>
        {team.schoolShortcode || team.school}
      </Text>
    </Stack>
  )
  return (
    <Group
      spacing="xs"
      {...props}
      sx={{ flex: 1, opacity: loser ? 0.5 : 1, ...props.sx }}
      noWrap={small}
    >
      <Tooltip label={!xs ? TextDetails : ""}>
        <Avatar src={team.logo} radius="md" size={small ? 35 : 50}>
          {team.name === "TBD" ? "TBD" : ""}
        </Avatar>
      </Tooltip>
      {xs && TextDetails}
    </Group>
  )
}

export default MatchCardTeam
