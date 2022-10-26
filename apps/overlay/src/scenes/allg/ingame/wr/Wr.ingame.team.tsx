import { Box, Group, GroupProps, Stack, Text } from "@mantine/core"
import { defaultSeries } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import { useInverse } from "../../../../hooks/useInverse.hook"

interface Props extends GroupProps {
  side: "teamA" | "teamB"
}
const WrIngameTeam = ({ side, ...props }: Props) => {
  const { getActiveTeam } = useParticipants()
  const { activeMatch, getScore } = useMatches()
  const invert = useInverse()

  const textAlign = side == "teamA" ? "left" : "right"
  const flexDirection = side == "teamA" ? "row" : "row-reverse"
  const reverseProps: GroupProps["sx"] = {
    textAlign,
    flexDirection,
  }

  const team = getActiveTeam(invert(side))
  const score = getScore(activeMatch ?? defaultSeries)?.[invert(side)].final
  return (
    <Group
      align="start"
      {...props}
      sx={{
        width: 535,
        height: 125,
        color: "white",
        alignItems: "flex-end",
        ...reverseProps,
        ...props.sx,
      }}
    >
      <Box
        sx={{
          alignSelf: "flex-start",
          height: 81,
          width: 126,
          backgroundImage: `url("${team.logo}")`,
          backgroundSize: "auto 80%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          flexShrink: 0,
        }}
      />
      <Group
        spacing={15}
        mb={-5}
        pl={side == "teamA" ? 105 : 0}
        pr={side == "teamB" ? 95 : 0}
        sx={{
          flexGrow: 1,
          flexDirection,
          letterSpacing: 4,
        }}
        noWrap
      >
        <Text sx={{ fontFamily: "Subway", color: "#ffd200" }} size={45}>
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
        sx={{
          flexShrink: 0,
          height: 60,
          width: 50,
        }}
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

export default WrIngameTeam
