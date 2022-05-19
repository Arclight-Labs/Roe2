import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import {
  Image,
  Box,
  Text,
  Group,
  Stack,
  Grid,
  Center,
  Container,
} from "@mantine/core"
type Params = Record<"talent", string>

const UpNext = () => {
  // add this to every overlay page
  useRoom()
  const params = useParams<Params>()
  const { chalTeams } = useParticipants()
  const { nextMatch } = useMatches()
  const teamA = nextMatch?.["teamA"].id || ""
  const teamB = nextMatch?.["teamB"].id || ""
  const teamANext = chalTeams[teamA]
  const teamBNext = chalTeams[teamB]

  return (
    <Group sx={{ marginLeft: "5rem" }}>
      <Box sx={{ height: 700, width: 700 }}>
        {/* <Image src={team?.logo} height={600} width={600} fit="contain" /> */}

        {/* <Image src={talent?.avatar} height={100} width={100} fit="contain" /> */}
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Stack align="center">
                <Image
                  src={teamANext?.logo}
                  height={200}
                  width={200}
                  fit="contain"
                  sx={{ marginBottom: "-4rem" }}
                />
                <Text
                  sx={{ fontFamily: "Industry", fontSize: 100, color: "white" }}
                >
                  {teamANext?.shortcode}
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
                src={teamBNext?.logo}
                height={200}
                width={200}
                fit="contain"
                sx={{ marginBottom: "-4rem" }}
              />
              <Text
                sx={{ fontFamily: "Industry", fontSize: 100, color: "white" }}
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
