import { AspectRatio, Button, Card, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { defaultVetoMode } from "utils/general/defaultValues"
import { VetoMap } from "utils/schema/veto.schema"
import { useWsAction } from "utils/socket"
import { useVeto } from "./Veto.hook"

interface Props {
  hook: ReturnType<typeof useVeto>
  onClose: VoidFunction
}
const VetoActionMap = ({ hook, onClose }: Props) => {
  const { vetoMapPick } = useWsAction()
  const {
    sequenceItem: item,
    settings,
    sequence,
    seriesId,
    side,
    accessToken,
  } = hook
  const [mapSelected, setSelectedMap] = useState<string | null>(null)
  const getModeMapPool = (modeId: string) => {
    const mode =
      settings.modes.find(({ id }) => id === modeId) || defaultVetoMode
    const maps: VetoMap[] = []
    const mapIds = mode.mapPool ?? []
    for (const mapId of mapIds) {
      const map = settings.mapPool.find(({ id }) => id === mapId)
      if (map) maps.push(map)
    }
    return maps
  }

  const mapPool = () => {
    const initialPool = item.mode ? getModeMapPool(item.mode) : settings.mapPool
    return initialPool.filter(
      (map) =>
        !sequence
          .filter(({ mapPicked, mode }) => !!mapPicked && mode === item.mode)
          .find(({ mapPicked }) => mapPicked === map.id)
    )
  }

  const selectMap = (mapId: string) => () => {
    setSelectedMap((m) => (m === mapId ? null : mapId))
  }

  const submitVeto = () => {
    if (!mapSelected || side === "host") return
    vetoMapPick(accessToken)({
      map: mapSelected,
      team: side,
      seriesId,
    })
    onClose()
  }
  return (
    <Stack>
      <Group align={"center"} position="center">
        {mapPool().map(({ id, imageUrl, name }) => (
          <AspectRatio key={id} ratio={16 / 9} sx={{ minWidth: 150 }}>
            <Card
              onClick={selectMap(id)}
              sx={(theme) => ({
                height: "100%",
                width: "100%",
                cursor: "pointer",
                border: `1px solid ${
                  theme.colors.gray[mapSelected === id ? 8 : 3]
                }`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage: `url(${imageUrl})`,
              })}
            >
              <Text
                px="md"
                py={5}
                color="white"
                sx={{ backgroundColor: "rgba(0,0,0,.5)", borderRadius: 5 }}
              >
                {name}
              </Text>
            </Card>
          </AspectRatio>
        ))}
      </Group>
      <Group position="right">
        <Button
          onClick={submitVeto}
          size="xs"
          sx={{ textTransform: "capitalize" }}
          disabled={!mapSelected}
          color={item.action === "ban" ? "red" : "blue"}
        >
          {item.action}
        </Button>
      </Group>
    </Stack>
  )
}

export default VetoActionMap
