import {
  Box,
  BoxProps,
  Group,
  GroupProps,
  Text,
  TextProps,
} from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { tbd } from "utils/general"

interface Props extends GroupProps {
  team?: SanitizedParticipant | null
  logoProps?: BoxProps
  textProps?: TextProps
}
const ParticipantInline = ({
  team: rawTeam,
  logoProps,
  textProps,
  ...props
}: Props) => {
  const team = rawTeam || tbd
  return (
    <Group spacing={8} align="center" {...props}>
      <Box
        {...logoProps}
        sx={{
          height: 24,
          width: 24,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${team.logo})`,
          ...logoProps?.sx,
        }}
      ></Box>
      <Text size="sm" {...textProps}>
        {team.name}
      </Text>
    </Group>
  )
}

export default ParticipantInline
