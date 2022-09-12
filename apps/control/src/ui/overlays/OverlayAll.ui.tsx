import { CardProps, SimpleGrid, Stack, Title } from "@mantine/core"
import { useState } from "react"
import OverlayCard from "./OverlayCard.ui"
import OverlayRoutes from "./OverlayRoutes"

interface OverlayCardProps {
  CardProps?: CardProps
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
    <SimpleGrid cols={4} spacing={"xs"} sx={{ justifyContent: "flex-start" }}>
      <Stack>
        <Title order={3}>General 🚀</Title>
        {overlayValues.slice(0, 5).map((o) => (
          <OverlayCard key={o[0]} overlay={o} />
        ))}
      </Stack>

      <Stack>
        <Title order={3}>Team 👩‍🚀</Title>
        {overlayValues.slice(5, 8).map((o) => (
          <OverlayCard key={o[0]} overlay={o} />
        ))}
      </Stack>

      <Stack>
        <Title order={3}>Players 🐱‍💻</Title>
        {overlayValues.slice(8, 10).map((o) => (
          <OverlayCard key={o[0]} overlay={o} />
        ))}
      </Stack>
    </SimpleGrid>
  )
}
export default OverlayAll
