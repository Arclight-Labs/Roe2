import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import {
  Image,
  Box,
  Text,
  CardProps,
  Group,
  Grid,
  Center,
  Stack,
} from "@mantine/core"
import { SanitizedSeries, Series } from "interface/waypoint"
import { tbd } from "utils/general"

interface ScheduleProps {
  match: Series
}

const Schedule = ({ match }: ScheduleProps) => {
  useRoom()
  const { chalTeams } = useParticipants()
  const { teamA, teamB } = match
  const aChalId = teamA.id
  const bChalId = teamB.id
  const a = chalTeams[aChalId || ""] ?? tbd
  const b = chalTeams[bChalId || ""] ?? tbd

  return (
    <Group sx={{ marginLeft: "5rem", marginBottom: "-25rem" }}>
      <Box sx={{ height: 700, width: 700 }}>
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Stack align="center">
                <Image
                  src={a?.logo}
                  height={200}
                  width={200}
                  fit="contain"
                  sx={{ marginBottom: "-4rem" }}
                />
                <Text
                  sx={{ fontFamily: "Industry", fontSize: 100, color: "white" }}
                >
                  {a?.shortcode}
                </Text>
              </Stack>
            </Center>
          </Grid.Col>
          <Grid.Col span={4}>
            <Image
              src={"/src/public/VS.png"}
              height={200}
              width={200}
              fit="contain"
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Stack align="center">
              <Image
                src={b?.logo}
                height={200}
                width={200}
                fit="contain"
                sx={{ marginBottom: "-4rem" }}
              />
              <Text
                sx={{ fontFamily: "Industry", fontSize: 100, color: "white" }}
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
