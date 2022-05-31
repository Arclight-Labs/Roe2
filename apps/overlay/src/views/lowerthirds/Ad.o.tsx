import { useLt } from "utils/hooks"
import { Box, Text, Image } from "@mantine/core"

const Ad = () => {
  const { ad, adPool } = useLt()
  return (
    <Box>
      <Text>Ad Stuff here</Text>
      {adPool.ads.map((ad) => {
        return (
          <div>
            <Image src={ad.image.URL}></Image>
            <Text>{ad.headline.text}</Text>
            <Text>{ad.body.text}</Text>
          </div>
        )
      })}
    </Box>
  )
}

export default Ad
