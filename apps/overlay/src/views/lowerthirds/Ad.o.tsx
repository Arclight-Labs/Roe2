import { useLive, useLt } from "utils/hooks"
import { Box, Text, Image, Group, Stack } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"

const Ad = () => {
  useRoom()
  const { ad, adPool } = useLt()
  const activeAd = adPool.ads.filter((currentAd) => {
    if (currentAd.id === ad) {
      return currentAd
    }
  })

  return (
    <div>
      {activeAd.map((ad) => {
        return (
          <Group id={ad.id} align={"flex-start"}>
            <Image
              fit="contain"
              src={ad.image.URL}
              height={ad.image.adj.h || 120}
              width={ad.image.adj.w || 120}
              sx={{
                marginRight: "2rem",
                marginLeft: ad.image.adj.x,
                marginTop: ad.image.adj.y,
                scale: ad.image.adj.scale || 1,
              }}
            />
            <Stack spacing={"xs"}>
              <Text
                sx={{
                  fontFamily: "Industry",
                  fontSize: ad.headline.size || 55,
                  lineHeight: 1,
                }}
              >
                {ad.headline.text}
              </Text>
              <Text
                sx={{
                  fontFamily: "Roboto",
                  fontSize: ad.body.size || 35,
                  lineHeight: 1,
                }}
              >
                {ad.body.text}
              </Text>
            </Stack>
          </Group>
        )
      })}
    </div>
  )
}

export default Ad
