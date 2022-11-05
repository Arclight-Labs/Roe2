import { Box, Stack } from "@mantine/core"
import { useLive } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import Match from "../match/Match.c"

const ScheduleScene = () => {
  useParamRoom()
  const {
    live: { schedule },
  } = useLive()

  return (
    <Box>
      <Stack spacing={40}>
        {schedule.map((match) => (
          <Match key={match.matchId} blurLoser seriesId={match.matchId} />
        ))}
      </Stack>
    </Box>
  )
}

export default ScheduleScene
