import {
  ActionIcon,
  AspectRatio,
  Card,
  Group,
  Indicator,
  Stack,
  Title,
} from "@mantine/core"
import {
  FieldArrayWithId,
  UseFieldArrayMove,
  UseFieldArrayRemove,
} from "react-hook-form"
import { CaretDown, CaretUp, Trash } from "tabler-icons-react"
import Coin from "ui/Coin.ui"
import { VetoMode, VetoSettings } from "utils/schema/veto.schema"
import Confirm from "../popups/Confirm.ui"

interface Props {
  sequence: FieldArrayWithId<VetoSettings, "sequence", "id">
  removeSequence: UseFieldArrayRemove
  move: UseFieldArrayMove
  upDisabled: boolean
  downDisabled: boolean

  index: number
  modes: VetoMode[]
}
const MatchvetoSequenceItem = ({
  sequence: { action, mapActor, mode, sideActor },
  removeSequence,
  upDisabled,
  downDisabled,
  move,
  modes,
  index,
}: Props) => {
  const currentMode = modes.find((m) => m.id === mode)
  const moveDirection = (direction: "up" | "down") => () => {
    if (direction === "up") return move(index, index - 1)
    move(index, index + 1)
  }
  return (
    <Indicator
      showZero={false}
      label={mode && !currentMode ? "‼️ Invalid mode" : ""}
      size={20}
    >
      <Card withBorder>
        <Group noWrap align="flex-start">
          <Card
            p="xs"
            withBorder
            sx={(theme) => ({
              backgroundColor:
                theme.colors[
                  action === "ban"
                    ? "red"
                    : action === "pick"
                    ? "blue"
                    : "green"
                ][9],
            })}
          >
            <AspectRatio ratio={1} sx={{ width: 14 }}>
              <Title order={4}>{index + 1}</Title>
            </AspectRatio>
          </Card>
          <Group sx={{ flex: 1 }}>
            {mapActor && (
              <Card p="xs" withBorder>
                <Stack spacing={5}>
                  <Group>
                    <Coin result={mapActor} />
                    <Stack spacing={0}>
                      <Title order={5} sx={{ lineHeight: 1 }}>
                        MAP {action.toUpperCase()}
                      </Title>
                      {currentMode && (
                        <Title order={6}>{currentMode.name}</Title>
                      )}
                    </Stack>
                  </Group>
                </Stack>
              </Card>
            )}
            {sideActor && (
              <Card p="xs" withBorder>
                <Stack spacing={5}>
                  <Group>
                    <Coin result={sideActor} />
                    <Title order={5}>Chooses side</Title>
                  </Group>
                </Stack>
              </Card>
            )}
          </Group>
          <Group spacing="xs" noWrap>
            <ActionIcon disabled={upDisabled} onClick={moveDirection("up")}>
              <CaretUp />
            </ActionIcon>
            <ActionIcon disabled={downDisabled} onClick={moveDirection("down")}>
              <CaretDown />
            </ActionIcon>
            <Confirm onConfirm={() => removeSequence(index)}>
              <ActionIcon color="red" variant="light">
                <Trash size={14} />
              </ActionIcon>
            </Confirm>
          </Group>
        </Group>
      </Card>
    </Indicator>
  )
}

export default MatchvetoSequenceItem
