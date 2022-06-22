import { useLt } from "utils/hooks"
import { Box, Group, Stack, Text } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"
import Marquee from "react-fast-marquee"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import CustomCarousel from "./CustomCarousel.o"
import { LTProps } from "./LowerThirds.o"

const LowerTicker = ({ isWS }: Partial<LTProps>) => {
  useRoom()

  const { ticker } = useLt()
  const [index, setIndex] = useState(0)
  const horizontalTexts = `| ${ticker.scrollerText.text
    .split("\n")
    .join(" | ")}`
  const verticalTexts = ticker.verticalText.text.split("\n")
  const handleNext = () => {
    setIndex(index + 1 === verticalTexts.length ? 0 : index + 1)
  }
  useEffect(() => {
    const timer = setInterval(() => handleNext(), 4000)
    return () => clearInterval(timer)
  }, [handleNext])

  const fontColor = isWS ? "#ffffff" : "#001c5a"
  return (
    <Group align="center">
      <Stack justify="center" spacing="xs" align="center">
        {verticalTexts.map((text, i) => (
          <AnimatePresence key={i}>
            {i === index && (
              <Box
                key={i}
                sx={{
                  height: "50%",
                  width: "100%",
                  position: "absolute",
                  overflow: "hidden",
                  zIndex: 99,
                  left: 0,
                  top: 15,
                }}
              >
                <CustomCarousel key={i}>
                  <Text
                    sx={{
                      fontFamily: "Industry",
                      fontSize: ticker.verticalText.size || 60,
                      color: fontColor,
                      lineHeight: 1.2,
                    }}
                    align="center"
                  >
                    {text}
                  </Text>
                </CustomCarousel>
              </Box>
            )}
          </AnimatePresence>
        ))}
        <Box
          sx={{
            height: "100%",
            width: "90%",
            position: "absolute",
            left: 70,
            top: 95,
          }}
        >
          <Marquee gradient={false} style={{ overflow: "hidden" }} speed={40}>
            <Text
              sx={{
                fontFamily: "Roboto",
                fontSize: ticker.scrollerText.size || 40,
                color: fontColor,
                lineHeight: 1.2,
              }}
              align="center"
            >
              {horizontalTexts}
            </Text>
          </Marquee>
        </Box>
      </Stack>
    </Group>
  )
}

export default LowerTicker
