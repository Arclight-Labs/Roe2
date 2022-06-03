import { useLt } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import { AdItem } from "./AdSingle.o"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import CustomCarousel from "./CustomCarousel.o"
import { AnimatePresence } from "framer-motion"
import React from "react"
import { Box } from "@mantine/core"

const AdPool = () => {
  useRoom()
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
        <AnimatePresence>
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
