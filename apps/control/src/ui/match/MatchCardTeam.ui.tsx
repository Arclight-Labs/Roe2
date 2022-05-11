import { Avatar, Group, GroupProps, Stack, Text } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"

interface TeamProps extends GroupProps {
  team: SanitizedParticipant
  loser?: boolean
  small?: boolean
}
const MatchCardTeam = ({ team, loser, small, ...props }: TeamProps) => {
  return (
    <Group
      spacing="xs"
      {...props}
      sx={{ flex: 1, opacity: loser ? 0.5 : 1, ...props.sx }}
      noWrap={small}
    >
      <Avatar src={team.logo} radius="md" size={small ? 35 : 50}>
        {team.name === "TBD" ? "TBD" : ""}
      </Avatar>
      <Stack spacing={0}>
        <Text lineClamp={1} sx={{ lineHeight: small ? 1 : "initial" }}>
          {team.shortcode || team.shortname || team.name}
        </Text>
        <Text size="xs" lineClamp={1}>
          {team.schoolShortcode || team.school}
        </Text>
      </Stack>
    </Group>
  )
}

export default MatchCardTeam
