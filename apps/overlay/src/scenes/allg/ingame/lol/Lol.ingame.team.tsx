import { Box, Group, GroupProps, Stack, Text } from "@mantine/core"
import { defaultSeries } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import { useInverse } from "../../../../hooks/useInverse.hook"

type Side = "teamA" | "teamB"
interface Props extends GroupProps {
  side: Side
}
const LolIngameTeam = ({ side, ...props }: Props) => {
  const { getActiveTeam } = useParticipants()
  const { activeMatch, getScore } = useMatches()
  const invert = useInverse()

  const textAlign = side == "teamA" ? "left" : "right"
  const flexDirection = side == "teamA" ? "row" : "row-reverse"
  const width = side == "teamA" ? 615 : 608
  const reverseProps: GroupProps["sx"] = {
    textAlign,
    flexDirection,
  }
  const team = getActiveTeam(invert(side))
  const score = getScore(activeMatch ?? defaultSeries)?.[invert(side)].final

  return (
    <Group
      align="start"
      spacing={10}
      {...props}
      sx={{ width, color: "white", ...reverseProps, ...props.sx }}
    >
      <Box
        sx={{
          height: 65,
          width: 110,
          backgroundImage: `url("${team.logo}")`,
          backgroundSize: "auto 80%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          flexShrink: 0,
        }}
      />
      <Group spacing={10} sx={{ flex: 1, flexDirection, letterSpacing: 4 }}>
        <Text sx={{ fontFamily: "Subway", color: "#ffd200" }} size={38}>
          {team.shortcode}
        </Text>
        <Text sx={{ fontFamily: "Subway" }} size={24}>
          {team.schoolShortcode}
        </Text>
      </Group>
      <Stack
        justify="center"
        align="center"
        pt={6}
        sx={{ height: 70, width: 70 }}
      >
        <Text
          align="center"
          sx={{ fontFamily: "Subway", marginLeft: side === "teamB" ? 8 : 0 }}
          size={48}
        >
          {score}
        </Text>
      </Stack>
    </Group>
  )
}

export default LolIngameTeam
