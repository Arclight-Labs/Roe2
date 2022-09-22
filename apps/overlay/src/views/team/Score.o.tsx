import { Box, Text } from "@mantine/core"
import { useParams } from "react-router-dom"
import { defaultSeries } from "utils/general"
import { useMatches } from "utils/hooks"
import { useInverse } from "../../hooks/useInverse.hook"
import useRoom from "../../hooks/useRoom.hook"
import { useAdjQuery } from "../../utils/useAdjQuery"

type Params = Record<"team" | "score", string>

const Score = () => {
  useRoom()
  const params = useParams<Params>()
  const { font, fontColor, fontSize, align } = useAdjQuery()
  const { activeMatch, getScore } = useMatches()
  const isInversed = useInverse()
  const teamSide = isInversed(params.team === "a" ? "teamA" : "teamB")
  const teamScore = getScore(activeMatch ?? defaultSeries)?.[teamSide].final

  return (
    <Box sx={{ height: 600, width: 600 }}>
      <Text
        sx={{ fontFamily: font, fontSize: fontSize, color: fontColor }}
        align={align}
      >
        {teamScore}
      </Text>
    </Box>
  )
}
export default Score
