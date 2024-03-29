import { Box, Center, Stack, Text } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import { SanitizedSeries } from "interface/waypoint"
import { useEffect, useState } from "react"
import { useMatches } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import CustomCarousel from "../lowerthirds/CustomCarousel.o"
import Schedule from "../schedule/Schedule.o"

const NextSchedule = () => {
  useRoom()
  const { schedule, nextMatch } = useMatches()
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex(index + 1 === schedule.length ? 0 : index + 1)
  }

  const isNextMatch = (match: SanitizedSeries, nextMatch: SanitizedSeries) => {
    return match.id === nextMatch.id
  }

  const animation = {
    initial: { opacity: 0, x: 350 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -350 },
  }

  const transition = {
    type: "spring",
    damping: 30,
    stiffness: 150,
  }

  useEffect(() => {
    const timer = setInterval(() => handleNext(), 5000)
    return () => clearInterval(timer)
  }, [handleNext])
  return (
    <div>
      {schedule.length
        ? schedule.map((match, i) => (
            <AnimatePresence key={match.id}>
              {i === index && (
                <Box
                  key={match.id}
                  sx={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    overflow: "hidden",
                    zIndex: 99,
                    left: 0,
                    top: 15,
                  }}
                >
                  <CustomCarousel
                    key={match.id}
                    animation={animation}
                    transition={transition}
                  >
                    <Center>
                      <Stack
                        sx={{
                          overflow: "hidden",
                        }}
                      >
                        <Text
                          sx={{
                            fontFamily: "Industry",
                            fontSize: 50,
                            color: "#ffffff",
                            lineHeight: 1,
                          }}
                          align="center"
                        >
                          {isNextMatch(match ?? "", nextMatch ?? "")
                            ? `UP NEXT`
                            : `TODAY'S MATCHES`}
                        </Text>
                        <Schedule key={match.id} match={match} />
                      </Stack>
                    </Center>
                  </CustomCarousel>
                </Box>
              )}
            </AnimatePresence>
          ))
        : ""}
    </div>
  )
}
export default NextSchedule
