import { Box, Group, GroupProps, Stack, Text } from "@mantine/core"
import { defaultSeries } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import { useInverse } from "../../../../hooks/useInverse.hook"
import x from "./x.png"

interface Props extends GroupProps {
  side: "teamA" | "teamB"
}
const CodmIngameTeam = ({ side, ...props }: Props) => {
  const { getActiveTeam } = useParticipants()
  const { activeMatch, getScore } = useMatches()
  const invert = useInverse()

  const textAlign = side == "teamA" ? "right" : "left"
  const flexDirection = side == "teamA" ? "row-reverse" : "row"
  const reverseProps: GroupProps["sx"] = {
    textAlign,
    flexDirection,
  }
  const team = getActiveTeam(invert(side))
  const score = getScore(activeMatch ?? defaultSeries)?.[invert(side)].final
  const bestof = activeMatch?.bestOf || 1
  const maxMatchCount = Math.ceil(bestof / 2)
  return (
    <Group
      align="start"
      spacing={10}
      {...props}
      sx={{
        width: 730,
        color: "white",
        ...reverseProps,
        ...props.sx,
      }}
    >
      <Box
        sx={{
          height: 118,
          width: 118,
          backgroundImage: `url("${team.logo}")`,
          backgroundSize: "80%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          flexShrink: 0,
        }}
      />
      <Group
        spacing={15}
        mt={-7}
        px={10}
        h={118}
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
      <Group
        p={14}
        spacing={8}
        h={118}
        sx={{
          flexShrink: 0,
          flexDirection: side === "teamA" ? "row" : "row-reverse",
        }}
      >
        {new Array(maxMatchCount).fill(1).map((_, i) => (
          <Stack
            key={i}
            justify="center"
            align="center"
            sx={{
              borderRadius: 1000,
              border: "3.5px solid white",
              height: 27,
              width: 27,
              overflow: "visible",
            }}
          >
            {score >= i + 1 && (
              <Box
                sx={{
                  minHeight: 34,
                  minWidth: 34,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  backgroundImage: `url("${x}")`,
                }}
              ></Box>
            )}
          </Stack>
        ))}
      </Group>
    </Group>
  )
}

export default CodmIngameTeam
