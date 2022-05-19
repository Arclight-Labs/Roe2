import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"

type Params = Record<"talent", string>

const Schedule = () => {
  useRoom()
  const params = useParams<Params>()
  const { getActiveTalent } = useLive()
  const talentIndex = +(params.talent ?? 0)
  const talent = getActiveTalent(talentIndex)

  return (
    <Box sx={{ height: 600, width: 600 }}>
      <Text sx={{ fontFamily: "Industry", fontSize: 40 }}>
        {talent?.username}
      </Text>
      <Text sx={{ fontFamily: "Roboto", fontSize: 20 }}>
        @{talent?.socialHandle}
      </Text>
    </Box>
  )
}
export default Schedule
