import { Box, Center, Stack, Text } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import { SanitizedSeries } from "interface/waypoint"
import { useEffect, useState } from "react"
import { useMatches } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import CustomCarousel from "../lowerthirds/CustomCarousel.o"
import Match from "../match/Match.c"

const ScheduleSlide = () => {
  useParamRoom()
  const { schedule, nextMatch } = useMatches()
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex(index + 1 === schedule.length ? 0 : index + 1)
  }

  const isNextMatch = (match: SanitizedSeries, nextMatch: SanitizedSeries) => {
    return match.id === nextMatch.id
  }

  const animation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
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
                    height: 250,
                    width: 600,
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
                            fontFamily: "Subway",
                            color: "#ffffff",
                            lineHeight: 1,
                            fontSize: 40,
                          }}
                          align="center"
                        >
                          {isNextMatch(match ?? "", nextMatch ?? "")
                            ? `Up Next`
                            : `Today's Matches`}
                        </Text>
                        <Match key={match.id} seriesId={`${match.id}`} />
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
export default ScheduleSlide
