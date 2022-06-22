import { useLt } from "utils/hooks"
import { Box, Group, Stack, Text } from "@mantine/core"
import useRoom from "../../hooks/useRoom.hook"
import Marquee from "react-fast-marquee"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import CustomCarousel from "./CustomCarousel.o"

const LowerTicker = () => {
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
                  left: 100,
                  top: 20,
                }}
              >
                <CustomCarousel key={i}>
                  <Text
                    sx={{
                      fontFamily: "Industry",
                      fontSize: ticker.verticalText.size || 60,
                      color: "#001c5a",
                      lineHeight: 1.2,
                    }}
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
            width: "100%",
            position: "absolute",
            left: 0,
            top: 100,
          }}
        >
          <Marquee gradient={false} style={{ overflow: "hidden" }} speed={40}>
            <Text
              sx={{
                fontFamily: "Roboto",
                fontSize: ticker.scrollerText.size || 40,
                color: "#001c5a",
                lineHeight: 1.2,
              }}
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
