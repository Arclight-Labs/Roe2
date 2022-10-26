import { Group, Image, Stack, Text } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { Ad } from "interface/ws"
import { FC } from "react"
import { useLt } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"

interface AdItemProps {
  ad: Ad
}
export const AdItem: FC<AdItemProps> = ({ ad }) => {
  const color = "#ffffff"

  return (
    <Group
      id={ad.id}
      align="center"
      sx={{ height: "100%", overflow: "hidden", zIndex: 99999 }}
    >
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
          flexShrink: 0,
        }}
      />
      <Stack justify="center" spacing={0} sx={{ flex: 1, height: 150 }}>
        <Text
          sx={{
            fontFamily: "Subway",
            fontSize: ad.headline.size || 55,
            color,
            lineHeight: 0.8,
            letterSpacing: 3,
          }}
          align="left"
        >
          {ad.headline.text}
        </Text>
        <Text
          sx={{
            fontFamily: "Tablet",
            fontSize: ad.body.size || 30,
            color,
            lineHeight: 1,
          }}
          lineClamp={3}
          align="left"
        >
          {ad.body.text}
        </Text>
      </Stack>
    </Group>
  )
}

const AdSingle = () => {
  useParamRoom()
  const { ad, adPool } = useLt()
  const [activeAd] = adPool.ads.filter((currentAd) => {
    if (currentAd.id === ad) {
      return currentAd
    }
  })

  return (
    <AnimatePresence>
      {activeAd && (
        <motion.div
          key={activeAd.id}
          exit={{ opacity: 0, y: -100 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <AdItem ad={activeAd} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdSingle
