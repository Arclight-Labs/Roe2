import { Box } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { useLt } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import { AdItem } from "./AdSingle.o"
import CustomCarousel from "./CustomCarousel.o"

const AdPool = () => {
  useParamRoom()
  const { adPool } = useLt()
  const [index, setIndex] = React.useState(0)
  const handleNext = () => {
    setIndex(index + 1 === adPool.ads.length ? 0 : index + 1)
  }
  const { ads } = adPool
  React.useEffect(() => {
    const timer = setInterval(() => handleNext(), 8000)
    return () => clearInterval(timer)
  }, [handleNext])

  return (
    <div>
      {ads.map((ad, i) => (
        <AnimatePresence key={ad.id}>
          {i === index && (
            <Box
              key={ad.id}
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            >
              <CustomCarousel key={i}>
                <AdItem ad={ad}></AdItem>
              </CustomCarousel>
            </Box>
          )}
        </AnimatePresence>
      ))}
    </div>
  )
}

export default AdPool
