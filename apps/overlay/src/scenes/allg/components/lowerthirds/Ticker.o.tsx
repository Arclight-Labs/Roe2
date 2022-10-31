import { Box, Group, Stack, Text } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"
import { useLt } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import CustomCarousel from "./CustomCarousel.o"

const Ticker = () => {
  useParamRoom()
  const { ticker } = useLt()
  const [index, setIndex] = useState(0)
  const horizontalTexts = `${ticker.scrollerText.text.split("\n").join(" | ")}`
  const verticalTexts = ticker.verticalText.text.split("\n")
  const handleNext = () => {
    setIndex(index + 1 === verticalTexts.length ? 0 : index + 1)
  }
  useEffect(() => {
    const timer = setInterval(() => handleNext(), 4000)
    return () => clearInterval(timer)
  }, [handleNext])

  return (
    <Stack spacing={0} sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          height: 120,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {verticalTexts.map((text, i) => (
          <AnimatePresence key={text + i}>
            {i === index && (
              <Group
                key={text + i}
                sx={{
                  height: 120,
                  width: "100%",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
                align="center"
              >
                <CustomCarousel key={text + i}>
                  <Text
                    sx={{
                      fontFamily: "Subway",
                      fontSize: ticker.verticalText.size || 70,
                      color: "#fff",
                      lineHeight: 0.8,
                    }}
                    px="xs"
                    lineClamp={2}
                  >
                    {text}
                  </Text>
                </CustomCarousel>
              </Group>
            )}
          </AnimatePresence>
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
        px="xs"
      >
        <Marquee gradient={false} style={{ overflow: "hidden" }} speed={40}>
          <Text
            sx={{
              fontFamily: "Tablet",
              fontSize: ticker.scrollerText.size || 30,
              color: "#fff",
              lineHeight: 1.2,
            }}
            align="center"
          >
            {horizontalTexts}
          </Text>
        </Marquee>
      </Box>
    </Stack>
  )
}

export default Ticker
