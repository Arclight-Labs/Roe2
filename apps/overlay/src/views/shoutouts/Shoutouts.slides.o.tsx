import { Avatar, Group, Stack, Text, Image, Card } from "@mantine/core"
import { TwitterApiResultsItem } from "interface/utils"
import { FC } from "react"
import { useLive } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const width = 500
const maxHeight = 600

const ShoutoutsSlide = () => {
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
      <Carousel
        stopOnHover={false}
        showArrows={false}
        showThumbs={false}
        showIndicators={false}
        interval={10 * 1000}
        showStatus={false}
        infiniteLoop
        autoPlay
        animationHandler="fade"
        key={liveEntries.length}
      >
        {liveEntries.map(([id, tweet]) => (
          <Stack style={{ height: maxHeight }} justify="center">
            <ShoutoutItem tweet={tweet} key={id} />
          </Stack>
        ))}
      </Carousel>
    </Stack>
  )
}

interface ShoutoutItemProps {
  tweet: TwitterApiResultsItem
}
const ShoutoutItem: FC<ShoutoutItemProps> = ({ tweet }) => {
  const img = tweet.images?.[0] || ""

  return (
    <Card>
      <Stack>
        <Group>
          <Avatar src={tweet.user.profile_image_url} />
          <Stack spacing={0}>
            <Text align="left" sx={{ lineHeight: 1 }}>
              {tweet.user.name}
            </Text>
            <Text align="left" color="dimmed" sx={{ lineHeight: 1 }}>
              {tweet.user.username}
            </Text>
          </Stack>
        </Group>
        <Text align="left" sx={{ wordBreak: "break-word" }}>
          {tweet.text}
        </Text>
      </Stack>

      {img && (
        <Card.Section mt="md">
          <Image width="100%" src={img} />
        </Card.Section>
      )}
    </Card>
  )
}

export default ShoutoutsSlide
