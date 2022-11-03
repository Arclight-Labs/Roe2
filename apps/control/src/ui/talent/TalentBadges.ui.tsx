import { Group, GroupProps } from "@mantine/core"
import { Select } from "tabler-icons-react"
import { useLive } from "utils/hooks/redux.hook"
import TalentBadge from "./TalentBadge.ui"

interface TalentBadges extends GroupProps {
  talentId: string
}
const TalentBadges = ({ talentId, ...props }: TalentBadges) => {
  const { isActiveTalent } = useLive()

  return (
    <Group spacing={2} align="flex-start" {...props}>
      {isActiveTalent(talentId) && (
        <TalentBadge label="Active Talent">
          <Select size={12} />
        </TalentBadge>
      )}
    </Group>
  )
}
export default TalentBadges
