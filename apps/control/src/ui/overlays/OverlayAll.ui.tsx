import { Card, CardProps, CardSection, Grid, Stack, Text } from "@mantine/core"
import { useState } from "react"
import OverlayCard from "./OverlayCard.ui"
import OverlayRoutes from "./OverlayRoutes"

interface OverlayCardProps {
  CardProps?: CardProps<"div">
}

const OverlayCards = Object.entries(
  OverlayRoutes({
    team: "a",
    index: 0,
    statIndex: 0,
    teamCode: "name",
    playerCode: "username",
  })
)

const OverlayAll = ({ CardProps }: OverlayCardProps) => {
  const [overlayValues, setOverlayValues] = useState(OverlayCards)

  return (
    <Stack>
      {overlayValues.map((o) => (
        <OverlayCard key={o[0]} overlay={o} />
      ))}
    </Stack>
  )
}
export default OverlayAll
