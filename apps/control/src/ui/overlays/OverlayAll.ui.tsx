import { Card, CardProps, CardSection, Text } from "@mantine/core"
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
  return (
    <div>
      {OverlayCards.map((o) => (
        <OverlayCard overlay={o} />
      ))}
    </div>
  )
}
export default OverlayAll
