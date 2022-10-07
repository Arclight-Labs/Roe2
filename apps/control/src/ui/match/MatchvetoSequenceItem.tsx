import {
  ActionIcon,
  Alert,
  AspectRatio,
  Card,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import {
  FieldArrayWithId,
  UseFieldArrayMove,
  UseFieldArrayRemove,
} from "react-hook-form"
import {
  AlertTriangle,
  Bulb,
  CaretDown,
  CaretUp,
  Dice5,
  Seeding,
  Trash,
} from "tabler-icons-react"
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
  seedWinner?: "teamA" | "teamB" | null
}

const MatchvetoSequenceItem = ({
  sequence: { action, mapActor, mode, sideActor, description },
  removeSequence,
  upDisabled,
  downDisabled,
  move,
  modes,
  seedWinner,
  index,
}: Props) => {
  const currentMode = modes.find((m) => m.id === mode)
  const moveDirection = (direction: "up" | "down") => () => {
    if (direction === "up") return move(index, index - 1)
    move(index, index + 1)
  }

  const theme = useMantineTheme()

  const invalidMode = !!mode && !currentMode

  const getColor = (colorIndex: number) => {
    const color =
      action === "ban" ? "red" : action === "pick" ? "blue" : "green"
    return theme.colors[color][colorIndex]
  }

  return (
    <Card withBorder>
      <Group noWrap align="flex-start">
        <Card p="xs" withBorder sx={{ backgroundColor: getColor(7) }}>
          <AspectRatio ratio={1} sx={{ width: 14 }}>
            <Title order={4}>{index + 1}</Title>
          </AspectRatio>
        </Card>
        <Group align="flex-start" sx={{ flex: 1 }} spacing="sm">
          {action === "decider" && (
            <Card p="xs" withBorder sx={{ backgroundColor: getColor(7) }}>
              <Group spacing="xs">
                <Dice5 size={30} />
                <Stack spacing={0}>
                  <Title order={6} sx={{ lineHeight: 1 }}>
                    {action.toUpperCase()}
                  </Title>
                  <Text size="sm">Map is randomly selected</Text>
                </Stack>
              </Group>
            </Card>
          )}
          {mapActor && (
            <Card p="xs" withBorder sx={{ backgroundColor: getColor(7) }}>
              <Stack spacing={5}>
                <Group spacing="xs">
                  {seedWinner ? (
                    <Seeding />
                  ) : (
                    <Coin IconProps={{ size: 30 }} result={mapActor} />
                  )}
                  <Stack spacing={0}>
                    <Text size="xs">
                      {seedWinner ? "Seed" : "Coin Flip"} {mapActor}
                    </Text>
                    <Title order={6} sx={{ lineHeight: 1 }}>
                      {action.toUpperCase()}S MAP
                    </Title>
                    {!!mode &&
                      (currentMode ? (
                        <Title order={6}>{currentMode.name}</Title>
                      ) : (
                        <Text color="red" size="xs">
                          Invalid Mode
                        </Text>
                      ))}
                  </Stack>
                </Group>
              </Stack>
            </Card>
          )}
          {sideActor && (
            <Card p="xs" withBorder>
              <Stack spacing={5}>
                {sideActor === "random" ? (
                  <Group spacing="xs">
                    <Dice5 size={30} />
                    <Title order={6} sx={{ lineHeight: 1 }}>
                      Sides are chosen randomly
                    </Title>
                  </Group>
                ) : (
                  <Group spacing="xs">
                    {seedWinner ? (
                      <Seeding />
                    ) : (
                      <Coin IconProps={{ size: 30 }} result={sideActor} />
                    )}
                    <Stack spacing={0}>
                      <Text size="xs">
                        {seedWinner ? "Seed" : "Coin flip"} {sideActor}
                      </Text>
                      <Title order={6} sx={{ lineHeight: 1 }}>
                        Chooses side
                      </Title>
                    </Stack>
                  </Group>
                )}
              </Stack>
            </Card>
          )}
          {invalidMode && (
            <Alert
              p="xs"
              title="Invalid Mode"
              color="red"
              icon={<AlertTriangle size={14} />}
            >
              <Text size="xs">
                The mode used for this sequence does not exist
              </Text>
            </Alert>
          )}
          {description && (
            <Alert
              variant="filled"
              icon={<Bulb />}
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {description}
            </Alert>
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
  )
}

export default MatchvetoSequenceItem
