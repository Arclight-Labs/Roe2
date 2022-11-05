import { Box, Stack, StackProps, Sx } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { tbd } from "utils/general"
import Headline from "../components/text/Headline.ui"
import Subtext from "../components/text/Subtext.ui"

type Side = "left" | "right"

const width = 350
const height = 260
const outerPadding = 70

interface Props extends StackProps {
  team: SanitizedParticipant
  side: Side
}

const stackStyles: Record<Side, Sx> = {
  left: { left: outerPadding },
  right: { right: outerPadding },
}
const HeadToHeadTeam = ({ team = tbd, side, ...props }: Props) => {
  const { logo, name, school } = team
  return (
    <Stack
      align="center"
      spacing={20}
      {...props}
      sx={{
        width,
        position: "absolute",
        top: "50%",
        ...stackStyles[side],
        ...props.sx,
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          backgroundSize: "contain",
          backgroundImage: `url(${logo})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width,
          height,
        }}
      />
      <Stack spacing={15}>
        <Headline
          align="center"
          sx={{ fontSize: 90, textTransform: "uppercase", lineHeight: 0.9 }}
        >
          {name}
        </Headline>
        <Subtext align="center" sx={{ fontSize: 30 }}>
          {school}
        </Subtext>
      </Stack>
    </Stack>
  )
}

export default HeadToHeadTeam
