import { useMatches, useParticipants } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text, Group, Grid, Center, Stack } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { defaultSeries, tbd } from "utils/general"
import VS from "../../public/VS.png"
interface ScheduleProps {
  match: SanitizedSeries
}

const Schedule = ({ match }: ScheduleProps) => {
  useRoom()
  const { chalTeams } = useParticipants()
  const { getScore } = useMatches()
  const { teamA, teamB } = match
  const aChalId = teamA?.id
  const bChalId = teamB?.id
  const a = chalTeams[aChalId || ""] ?? tbd
  const b = chalTeams[bChalId || ""] ?? tbd

  const aLoser = aChalId === match?.loserId
  const bLoser = bChalId === match?.loserId
  const aWinner = aChalId === match?.winnerId
  const bWinner = bChalId === match?.winnerId

  const teamAScore = getScore(match ?? defaultSeries)?.["a"]?.final
  const teamBScore = getScore(match ?? defaultSeries)?.["b"]?.final

  return (
    <Group sx={{ marginLeft: "5rem", marginBottom: "-22rem" }}>
      <Box sx={{ height: 800, width: 800 }}>
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Stack align="center">
                <Image
                  src={a?.logo}
                  height={200}
                  width={200}
                  fit="contain"
                  sx={{
                    marginBottom: "-2rem",
                    opacity: aLoser ? "35%" : "100%",
                  }}
                />
                <Text
                  sx={{
                    fontFamily: "Industry",
                    fontSize: 100,
                    color: aWinner ? "#ffd200" : "white",
                    opacity: aLoser ? "35%" : "100%",
                  }}
                >
                  {a?.shortcode}
                </Text>
              </Stack>
            </Center>
          </Grid.Col>
          <Grid.Col span={5}>
            <Stack align="center">
              <Image src={VS} height={200} width={200} fit="contain" />
              <Text
                sx={{
                  fontFamily: "Industry",
                  fontSize: 60,
                  color: "#ffd200",
                  marginTop: " 5px",
                }}
              >
                {teamAScore} - {teamBScore}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}>
            <Stack align="center">
              <Image
                src={b?.logo}
                height={200}
                width={200}
                fit="contain"
                sx={{ marginBottom: "-2rem", opacity: bLoser ? "35%" : "100%" }}
              />
              <Text
                sx={{
                  fontFamily: "Industry",
                  fontSize: 100,
                  color: bWinner ? "#ffd200" : "white",
                  opacity: bLoser ? "35%" : "100%",
                }}
              >
                {b?.shortcode}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </Group>
  )
}
export default Schedule
