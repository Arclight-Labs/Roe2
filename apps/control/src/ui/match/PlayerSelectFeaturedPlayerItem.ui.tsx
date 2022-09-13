import { Avatar, Group, Text } from "@mantine/core"
import { forwardRef } from "react"

export interface FeaturedPlayerItemProps {
  value: string
  image: string
  label: string
}

const PlayerSelectFeaturedPlayerItem = forwardRef<
  HTMLDivElement,
  FeaturedPlayerItemProps
>(({ image, label, ...props }, ref) => {
  return (
    <Group noWrap {...props} ref={ref}>
      <Avatar src={image} />
      <Text size="sm">{label}</Text>
    </Group>
  )
})

export default PlayerSelectFeaturedPlayerItem
