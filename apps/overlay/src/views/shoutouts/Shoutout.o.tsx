import { Avatar, Group, Stack, Text } from "@mantine/core"
import { TwitterApiResultsItem } from "interface/utils"
import { FC } from "react"
import { useLive } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { QueryColor } from "../../utils/queryParams"
import { Container } from "@mantine/core"
import { decodeEntities } from "utils/general"

const width = 750
const maxHeight = 300
const fontHeader = "Industry"
const fontContent = "Roboto"

const Shoutout = () => {
  useRoom()
  const {
    live: { shoutouts = {} },
  } = useLive()

  const liveEntries = Object.entries(shoutouts)
  return (
    <Stack
      sx={{
        width,
        height: 1080,
      }}
    >
      {liveEntries.map(([id, tweet]) => (
        <Stack style={{ height: maxHeight }} justify="center">
          <ShoutoutItem tweet={tweet} key={id} />
        </Stack>
      ))}
    </Stack>
  )
}

interface ShoutoutItemProps {
  tweet: TwitterApiResultsItem
}
const ShoutoutItem: FC<ShoutoutItemProps> = ({ tweet }) => {
  return (
    <Container>
      <Group>
        <Group>
          <Group>
            <Avatar size="lg" src={tweet.user.profile_image_url} />
            <Stack spacing={0}>
              <Text
                align="left"
                sx={{
                  fontSize: 30,
                  lineHeight: 1,
                  fontFamily: fontHeader,
                  color: QueryColor["yellow"],
                }}
              >
                {tweet.user.name}
              </Text>

              <Text
                align="left"
                color="dimmed"
                sx={{
                  lineHeight: 1,
                  fontFamily: fontHeader,
                  color: "#dddddd",
                }}
              >
                @{tweet.user.username}
              </Text>
            </Stack>
            <Text
              align="left"
              sx={{
                lineHeight: 1.1,
                fontSize: 25,
                wordBreak: "break-word",
                fontFamily: fontContent,
                color: QueryColor["white"],
              }}
            >
              {decodeEntities(tweet.text)}
            </Text>
          </Group>
        </Group>
      </Group>
    </Container>
  )
}

export default Shoutout
