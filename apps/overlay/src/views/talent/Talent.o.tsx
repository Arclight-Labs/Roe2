import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { useInverse } from "../../hooks/useInverse.hook"
import { defaultSeries } from "utils/general"
import { defaultTalent } from "utils/general/defaultValues"
import { User } from "interface/db"

type Params = Record<"talent", string>

const Talent = () => {
  // add this to every overlay page
  useRoom()
  const params = useParams<Params>()

  const { getActiveTalent } = useLive()
  const talentIndex = +(params.talent ?? 0)
  const talent = getActiveTalent(talentIndex)
  //   const talentRaw = getAllTalents(defaultTalent)
  //   const talent = Object.values(talentRaw)
  return (
    <Box sx={{ height: 600, width: 600 }}>
      {/* <Image src={team?.logo} height={600} width={600} fit="contain" /> */}

      {/* <Image src={talent?.avatar} height={100} width={100} fit="contain" /> */}
      <Text sx={{ fontFamily: "Industry", fontSize: 40 }}>
        {talent?.username}
      </Text>
      <Text sx={{ fontFamily: "Roboto", fontSize: 20 }}>
        @{talent?.socialHandle}
      </Text>
    </Box>
  )
}
export default Talent
