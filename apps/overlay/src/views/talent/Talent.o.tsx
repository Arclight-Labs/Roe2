import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { useInverse } from "../../hooks/useInverse.hook"
import { defaultSeries } from "utils/general"
import { defaultTalent } from "utils/general/defaultValues"
import { User } from "interface/db"

type TeamCode =
  | "shortcode"
  | "name"
  | "shortname"
  | "schoolShortcode"
  | "school"

// type Params = Record<"team" | "name", string>
type Params = Record<"talent", string>

const TeamName = () => {
  // add this to every overlay page
  useRoom()
  const params = useParams<Params>()

  const { getAllTalents } = useLive()
  const talentCode = +(params.talent ?? defaultTalent.uid)
  const talentRaw = getAllTalents(defaultTalent)
  const talent = Object.values(talentRaw)
  return (
    <Box sx={{ height: 600, width: 600 }}>
      {/* <Image src={team?.logo} height={600} width={600} fit="contain" /> */}
      <Image
        src={talent[talentCode]?.avatar}
        height={100}
        width={100}
        fit="contain"
      />
      <Text sx={{ fontFamily: "Industry", fontSize: 40 }}>
        {talent[talentCode]?.username}
      </Text>
      <Text sx={{ fontFamily: "Roboto", fontSize: 20 }}>
        @{talent[talentCode]?.socialHandle}
      </Text>
    </Box>
  )
}
export default TeamName
