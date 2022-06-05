import { Avatar, Box, Group, Stack, Text } from "@mantine/core"
import { TwitterApiResultsItem } from "interface/utils"
import { FC } from "react"
import { useLive } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { QueryColor } from "../../utils/queryParams"
import { decodeEntities } from "utils/general"

const maxHeight = 300
const fontHeader = "Industry"
const fontContent = "Roboto"

const Shoutout = () => {
  useRoom()
  const {
    live: { shoutouts = {} },
  } = useLive()

  const [shoutout] = Object.entries(shoutouts)
  if (!shoutout) return null
  const [id, tweet] = shoutout
  return (
    <Stack>
      <Stack style={{ height: maxHeight }} justify="center">
        <ShoutoutItem tweet={tweet} key={id} />
      </Stack>
    </Stack>
  )
}

interface ShoutoutItemProps {
  tweet: TwitterApiResultsItem
}
const ShoutoutItem: FC<ShoutoutItemProps> = ({ tweet }) => {
  return (
    <Group>
      <Group ml={300} sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            right: "calc(100% + 63px)",
            height: 190,
            width: 210,
            borderRadius: 5,
            backgroundImage: `url("${
              !tweet.images[0]?.includes(".mp4") && tweet.images[0]
            }")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          {tweet.images[0]?.includes(".mp4") && (
            <video
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              autoPlay
              loop
              muted
              src={tweet.images[0]}
            />
          )}
        </Box>
        <Stack sx={{ width: 750 }}>
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
                size="lg"
                sx={{
                  lineHeight: 1,
                  fontFamily: fontHeader,
                  color: "#dddddd",
                }}
              >
                @{tweet.user.username}
              </Text>
            </Stack>
          </Group>
          <Text
            align="left"
            sx={{
              lineHeight: 1.1,
              fontSize: 30,
              wordBreak: "break-word",
              fontFamily: fontContent,
              color: QueryColor["white"],
            }}
            lineClamp={3}
          >
            {decodeEntities(tweet.text)}
          </Text>
        </Stack>
      </Group>
    </Group>
  )
}

export default Shoutout
