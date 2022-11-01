import { Avatar, Card, Group, Text, UnstyledButton } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { forwardRef } from "react"
import { tbd } from "utils/general"
import { useParticipants } from "utils/hooks"

interface Props {
  match: SanitizedSeries
  onClick?: VoidFunction
}
const RundownItemFlowRowMatch = forwardRef<HTMLDivElement, Props>(
  ({ match, onClick, ...props }, ref) => {
    const { getTeam } = useParticipants()
    const matchId = `${match.id}`
    const teamA = getTeam(matchId, "teamA") || tbd
    const teamB = getTeam(matchId, "teamB") || tbd

    return (
      <Card
        ref={ref}
        p={0}
        withBorder
        sx={(theme) => ({
          "&:hover": { border: `1px solid ${theme.colors.gray[5]}` },
        })}
        onClick={onClick}
      >
        <UnstyledButton sx={{ width: "100%" }} {...props}>
          <Group noWrap position="apart">
            <Group position="left" align="center" noWrap>
              <Avatar variant="light" radius="sm" src={teamA.logo} />
              <Text size="xs">{teamA.shortcode || "TBD"}</Text>
            </Group>
            <Text>VS</Text>
            <Group position="right" align="center" noWrap>
              <Text size="xs" align="right">
                {teamB.shortcode || "TBD"}
              </Text>
              <Avatar variant="light" radius="sm" src={teamB.logo} />
            </Group>
          </Group>
        </UnstyledButton>
      </Card>
    )
  }
)

export default RundownItemFlowRowMatch
