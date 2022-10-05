import { Button, Card, Center, Group, Stack, Title } from "@mantine/core"
import { useState } from "react"
import { useWsAction } from "utils/socket"
import { useVeto } from "./Veto.hook"

type Side = "red" | "blue"
interface Props {
  hook: ReturnType<typeof useVeto>
  onClose: VoidFunction
}
const VetoActionSide = ({ hook, onClose }: Props) => {
  const [sideSelected, setSideSelected] = useState<Side | null>(null)
  const { vetoSidePick } = useWsAction()
  const { settings, accessToken, seriesId, side: team } = hook
  const selectSide = (side: Side) => () => {
    setSideSelected((s) => (s === side ? null : side))
  }

  const confirm = () => {
    if (team === "host" || !sideSelected) return
    vetoSidePick(accessToken)({ seriesId, team, side: sideSelected })
    onClose()
  }
  return (
    <Stack>
      <Group noWrap grow>
        <Card
          withBorder
          sx={(theme) => ({
            cursor: "pointer",
            border: `1px solid ${
              theme.colors.gray[sideSelected === "red" ? 7 : 3]
            }`,
          })}
          onClick={selectSide("red")}
        >
          <Center>
            <Title order={3}>{settings.redSideName}</Title>
          </Center>
        </Card>
        <Card
          withBorder
          sx={(theme) => ({
            cursor: "pointer",
            border: `1px solid ${
              theme.colors.gray[sideSelected === "blue" ? 7 : 3]
            }`,
          })}
          onClick={selectSide("blue")}
        >
          <Center>
            <Title order={3}>{settings.blueSideName}</Title>
          </Center>
        </Card>
      </Group>
      <Group position="right">
        <Button onClick={confirm} disabled={!sideSelected}>
          Confirm
        </Button>
      </Group>
    </Stack>
  )
}

export default VetoActionSide
