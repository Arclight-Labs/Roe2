import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"
import { useQuery } from "../../utils/useQuery"

type Params = Record<"talent", string>
type alignType = "left" | "center" | "right" | undefined

const Talent = () => {
  useRoom()
  const params = useParams<Params>()
  const query = useQuery()
  const { getActiveTalent } = useLive()
  const talentIndex = +(params.talent ?? 0)
  const talent = getActiveTalent(talentIndex)
  const align = query.get("align") ?? "left"

  return (
    <Box
      sx={{
        height: 600,
        width: 1000,
      }}
    >
      <Text
        sx={{ fontFamily: "Industry", fontSize: 120 }}
        align={align as alignType}
      >
        {talent?.username}
      </Text>
      <Text
        sx={{ fontFamily: "Roboto", fontSize: 70 }}
        align={align as alignType}
      >
        @{talent?.socialHandle}
      </Text>
    </Box>
  )
}
export default Talent
