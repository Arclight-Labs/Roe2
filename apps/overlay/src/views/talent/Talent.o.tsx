import { useLive } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Box, Text } from "@mantine/core"
import { useAdjQuery } from "../../utils/useAdjQuery"

type Params = Record<"talent", string>

const Talent = () => {
  useRoom()
  const params = useParams<Params>()
  const { align } = useAdjQuery()
  const { getActiveTalent } = useLive()
  const talentIndex = +(params.talent ?? 0)
  const talent = getActiveTalent(talentIndex)

  return (
    <Box
      sx={{
        height: 600,
        width: 1000,
      }}
    >
      <Text sx={{ fontFamily: "Industry", fontSize: 120 }} align={align}>
        {talent?.username}
      </Text>
      <Text sx={{ fontFamily: "Roboto", fontSize: 70 }} align={align}>
        @{talent?.socialHandle}
      </Text>
    </Box>
  )
}
export default Talent
