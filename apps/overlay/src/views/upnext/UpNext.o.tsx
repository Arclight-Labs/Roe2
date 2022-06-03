import { useMatches, useParticipants } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text, Group, Stack, Grid, Center } from "@mantine/core"
import { defaultSeries } from "utils/general/defaultValues"
import VS from "../../public/VS.png"

const UpNext = () => {
  useRoom()
  const { chalTeams } = useParticipants()
  const { nextMatch, getScore } = useMatches()
  const teamA = nextMatch?.["teamA"].id || ""
  const teamB = nextMatch?.["teamB"].id || ""
  const teamANext = chalTeams[teamA]
  const teamBNext = chalTeams[teamB]

  const aLoser = teamA === nextMatch?.loserId
  const bLoser = teamB === nextMatch?.loserId
  const aWinner = teamA === nextMatch?.winnerId
  const bWinner = teamB === nextMatch?.winnerId

  const teamAScore = getScore(nextMatch ?? defaultSeries)?.["a"].final
  const teamBScore = getScore(nextMatch ?? defaultSeries)?.["b"].final

  return (
    <Group sx={{ marginLeft: "5rem" }}>
      <Box sx={{ height: 700, width: 700 }}>
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Stack align="center">
                <Image
                  src={teamANext?.logo}
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
                  {teamANext?.shortcode}
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
                src={teamBNext?.logo}
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
                {teamBNext?.shortcode}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </Group>
  )
}
export default UpNext
