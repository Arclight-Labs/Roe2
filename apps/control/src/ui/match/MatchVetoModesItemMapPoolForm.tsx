import {
  AspectRatio,
  Box,
  Card,
  Checkbox,
  Divider,
  Image,
  Modal,
  ModalProps,
  SimpleGrid,
} from "@mantine/core"
import { FieldPath, UseFormSetValue } from "react-hook-form"
import { defaultVetoMode } from "utils/general/defaultValues"
import { VetoMap, VetoMode, VetoSettings } from "utils/schema/veto.schema"

interface Props extends ModalProps {
  setValue: UseFormSetValue<VetoSettings>
  mode: VetoMode
  mapPool: VetoMap[]
  modeIndex: number
}
const MatchVetoModesItemMapPoolForm = ({
  modeIndex,
  mapPool,
  mode = defaultVetoMode,
  setValue,
  ...props
}: Props) => {
  const toggleMap = (mapId: string) => () => {
    const mapPool = mode.mapPool || []
    const exists = mode.mapPool.some((id) => mapId === id)
    const path: FieldPath<VetoSettings> = `modes.${modeIndex}.mapPool`
    const newValue = exists
      ? mapPool.filter((id) => id !== mapId)
      : Array.from(new Set([...mapPool, mapId]))

    setValue(path, newValue)
  }
  const isSelected = (mapId: string) => mode.mapPool.some((id) => mapId === id)

  return (
    <Modal {...props} size="lg" title={`Select Map Pool for ${mode.name}`}>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "sm", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {mapPool.map((map) => (
          <Card
            key={map.id}
            withBorder
            radius="md"
            onClick={toggleMap(map.id)}
            sx={{ cursor: "pointer" }}
          >
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={map.imageUrl}
                  withPlaceholder
                  alt={map.name}
                ></Image>
              </AspectRatio>
            </Card.Section>
            <Divider />
            <Card.Section>
              <Box p="xs">
                <Checkbox checked={isSelected(map.id)} label={map.name} />
              </Box>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </Modal>
  )
}

export default MatchVetoModesItemMapPoolForm
