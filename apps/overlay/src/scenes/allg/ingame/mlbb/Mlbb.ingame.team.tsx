import { Box, Group, GroupProps, Stack, Text } from "@mantine/core"
import { defaultSeries } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import { useInverse } from "../../../../hooks/useInverse.hook"

interface Props extends GroupProps {
  side: "teamA" | "teamB"
}
const MlbbIngameTeam = ({ side, ...props }: Props) => {
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
        width: 575,
        Color: "rgba(0,0,0,0.5)",
        color: "white",
        alignItems: "flex-end",
        ...reverseProps,
        ...props.sx,
      }}
    >
      <Box
        sx={{
          height: 118,
          width: 140,
          backgroundImage: `url("${team.logo}")`,
          backgroundSize: "80%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          flexShrink: 0,
        }}
      />
      <Group
        spacing={15}
        mb={-5}
        px={10}
        sx={{
          flex: 1,
          flexDirection,
          letterSpacing: 4,
        }}
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
          height: 60,
          width: 60,
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

export default MlbbIngameTeam
