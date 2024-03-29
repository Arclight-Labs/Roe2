import {
  Avatar,
  Button,
  Card,
  CardProps,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core"
import { TwitterApiResultsItem } from "interface/utils"
import { FC } from "react"
import { decodeEntities } from "utils/general"
import { useLive } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"

interface ShoutoutsCardProps extends Omit<CardProps, "children"> {
  tweet: TwitterApiResultsItem
}
const ShoutoutsCard: FC<ShoutoutsCardProps> = ({ tweet, ...props }) => {
  const { accessToken } = useAuth()
  const img = tweet.images?.[0] || ""
  const {
    live: { shoutouts = {} },
  } = useLive()

  const select = () => {
    const newShoutouts = { ...shoutouts, [tweet.id]: tweet }
    const newData = { shoutouts: newShoutouts }
    setLive(accessToken)(newData)
  }
  const unSelect = () => {
    const newShoutouts = { ...shoutouts }
    delete newShoutouts[tweet.id]
    const newData = { shoutouts: newShoutouts }
    setLive(accessToken)(newData)
  }

  return (
    <Card {...props} sx={{ height: "auto" }}>
      <Stack pb="md">
        <Group>
          <Avatar src={tweet.user.profile_image_url} />
          <Stack spacing={0}>
            <Text size="sm">{tweet.user.name}</Text>
            <Text size="xs" color="dimmed">
              {tweet.user.username}
            </Text>
          </Stack>
        </Group>
        <Text sx={{ wordBreak: "break-word" }}>
          {decodeEntities(tweet.text)}
        </Text>
      </Stack>

      {img && (
        <Card.Section>
          {img.includes(".mp4") ? (
            <video width="100%" height="auto" src={img} autoPlay loop muted />
          ) : (
            <Image width="100%" src={img} />
          )}
        </Card.Section>
      )}
      <Group mt="md">
        {shoutouts[tweet.id] ? (
          <Button size="xs" onClick={unSelect} color="red">
            Unselect
          </Button>
        ) : (
          <Button size="xs" onClick={select}>
            Select
          </Button>
        )}
      </Group>
    </Card>
  )
}

export default ShoutoutsCard
