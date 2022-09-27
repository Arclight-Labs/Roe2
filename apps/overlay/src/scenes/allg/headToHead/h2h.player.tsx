import { Box, Stack, StackProps, Sx } from "@mantine/core"
import { SanitizedUser } from "interface/waypoint"
import { adjImageStyles } from "utils/general"
import { defaultPhotoURL, defaultPlayer } from "utils/general/defaultValues"
import Headline from "../components/text/Headline.ui"
import left from "./arrow_featured_player_a.png"
import right from "./arrow_featured_player_b.png"

const arrow = { left, right }

interface Props extends StackProps {
  player: SanitizedUser
  side: "left" | "right"
}

const Head2HeadPlayer = ({ player = defaultPlayer, side, ...props }: Props) => {
  const username = player.username || "XXX"
  const adj = { ...player.photoAdj, h: 940, w: 970 }
  const URL = player.photoURL

  const arrowProps: Record<"left" | "right", Sx> = {
    left: { width: 39, height: 79, left: "28%", top: "140%" },
    right: { width: 40, height: 78, right: "34%", top: "140%" },
  }

  return (
    <Stack
      align="center"
      {...props}
      sx={{
        position: "relative",
        overflow: "visible",
        ...props.sx,
      }}
      spacing={0}
    >
      <Stack
        spacing={0}
        sx={{
          overflow: "visible",
          position: "relative",
          width: "100%",
        }}
      >
        <Headline
          align="center"
          sx={{
            transform: "translateY(10px)",
            color: "#fff",
            fontSize: 80,
            lineHeight: 1,
          }}
        >
          {username}
        </Headline>
        <Box
          sx={{
            position: "absolute",
            ...arrowProps[side],
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url("${arrow[side]}")`,
          }}
        ></Box>
      </Stack>
      <Box
        sx={{
          ...adjImageStyles({ adj, URL: player.photoURL || defaultPhotoURL }),
          backgroundPosition: "bottom center",
          filter: !URL ? "contrast(0)" : "none",
        }}
      ></Box>
    </Stack>
  )
}

export default Head2HeadPlayer
