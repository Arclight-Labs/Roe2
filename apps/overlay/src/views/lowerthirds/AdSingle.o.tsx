import { useLt } from "utils/hooks"
import { Text, Image, Group, Stack } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"
import { FC } from "react"
import { Ad } from "interface/ws"
import { AnimatePresence, motion } from "framer-motion"
import { LTProps } from "./LowerThirds.o"
interface AdItemProps {
  ad: Ad
  isWS: boolean | undefined
}

export const AdItem: FC<AdItemProps> = ({ ad, isWS }) => {
  const fontColor = isWS ? "#ffffff" : "#001c5a"

  return (
    <Group id={ad.id} align={"center"} sx={{ padding: 20, zIndex: 99999 }}>
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
      <Stack spacing={"xs"} sx={{ flex: 1 }}>
        <Text
          sx={{
            fontFamily: "Industry",
            fontSize: ad.headline.size || 55,
            color: fontColor,
            lineHeight: 1,
          }}
          align="left"
        >
          {ad.headline.text}
        </Text>
        <Text
          sx={{
            fontFamily: "Roboto",
            fontSize: ad.body.size || 35,
            color: fontColor,
            lineHeight: 1,
          }}
          align="left"
        >
          {ad.body.text}
        </Text>
      </Stack>
    </Group>
  )
}

const AdSingle = ({ isWS }: Partial<LTProps>) => {
  useRoom()
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
          <AdItem ad={activeAd} isWS={isWS} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdSingle
