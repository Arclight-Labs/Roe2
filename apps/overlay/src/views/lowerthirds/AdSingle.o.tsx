import { useLive, useLt } from "utils/hooks"
import { Box, Text, Image, Group, Stack } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"
import { FC } from "react"
import { Ad } from "interface/ws"

interface AdItemProps {
  ad: Ad
}

export const AdItem: FC<AdItemProps> = ({ ad }) => {
  return (
    <Group id={ad.id} align={"flex-start"}>
      <Image
        fit="contain"
        src={ad.image.URL}
        height={ad.image.adj.h || 120}
        width={ad.image.adj.w || 120}
        sx={{
          marginRight: "3rem",
          marginLeft: ad.image.adj.x,
          marginTop: ad.image.adj.y,
          scale: ad.image.adj.scale || 1,
        }}
      />
      <Stack spacing={"xs"} align={"center"}>
        <Text
          sx={{
            fontFamily: "Industry",
            fontSize: ad.headline.size || 55,
            color: "#001c5a",
            lineHeight: 1,
          }}
        >
          {ad.headline.text}
        </Text>
        <Text
          sx={{
            fontFamily: "Roboto",
            fontSize: ad.body.size || 35,
            color: "#001c5a",
            lineHeight: 1,
          }}
        >
          {ad.body.text}
        </Text>
      </Stack>
    </Group>
  )
}

const AdSingle = () => {
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
        return <AdItem ad={ad} key={ad.id} />
      })}
    </div>
  )
}

export default AdSingle
