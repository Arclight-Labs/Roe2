import { zodResolver } from "@hookform/resolvers/zod"
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Button,
  Card,
  Center,
  Group,
  Modal,
  ModalProps,
  SegmentedControl,
  Select,
  SelectItem,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core"
import { forwardRef, useState } from "react"
import {
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
  useForm,
} from "react-hook-form"
import {
  CaretLeft,
  CaretRight,
  CircleCheck,
  CircleDashed,
  CircleOff,
  Coin,
  CoinOff,
} from "tabler-icons-react"
import { defaultVetoSettingsSequenceItem } from "utils/general/defaultValues"
import {
  CoinTeamResult,
  VetoAction,
  VetoMode,
  VetoSequenceSettingsItem,
  vetoSequenceSettingsItemSchema,
  VetoSettings,
} from "utils/schema/veto.schema"

interface Props extends ModalProps {
  append: UseFieldArrayAppend<VetoSettings, "sequence">
  update: UseFieldArrayUpdate<VetoSettings, "sequence">
  modes: VetoMode[]
  sequenceNumber: number
  sequence: VetoSequenceSettingsItem[]
  gotoPreviousSequence: (index: number) => void
  gotoNextSequence: (index: number) => void
}
const MatchVetoSequenceItemModal = ({
  append,
  modes = [],
  sequenceNumber,
  gotoPreviousSequence,
  gotoNextSequence,
  sequence = [],
  update,
  ...props
}: Props) => {
  const [addMore, setAddMore] = useState(false)
  const { handleSubmit, watch, setValue, reset } =
    useForm<VetoSequenceSettingsItem>({
      defaultValues: defaultVetoSettingsSequenceItem,
      resolver: zodResolver(vetoSequenceSettingsItemSchema),
    })

  const { action, mode, mapActor, sideActor } = watch()
  const isEdit = sequenceNumber < sequence.length
  const modeOptions = modes.map((item) => ({
    label: item.name,
    value: item.id,
    image: item.imageUrl,
  }))

  const moveSequence = (direction: "next" | "prev") => () => {
    if (direction === "next") {
      reset(sequence[sequenceNumber + 1] ?? defaultVetoSettingsSequenceItem)
      gotoNextSequence(sequenceNumber)
      return
    }
    reset(sequence[sequenceNumber - 1] ?? defaultVetoSettingsSequenceItem)
    gotoPreviousSequence(sequenceNumber)
  }

  const onSubmit = handleSubmit((data) => {
    if (data.action === "decider") {
      data.sideActor = null
      data.mapActor = null
    }

    if (isEdit) {
      update(sequenceNumber, data)
    } else {
      append(data)
    }
    if (!addMore) return props.onClose?.()
    moveSequence("next")()
  }, console.error)

  const ItemComponent = forwardRef<HTMLDivElement, SelectItem>(
    ({ label, image, ...props }, ref) => (
      <div ref={ref} {...props}>
        <Group noWrap>
          <Avatar src={image} />

          <Text size="sm">{label}</Text>
        </Group>
      </div>
    )
  )

  return (
    <Modal
      {...props}
      title={`${isEdit ? "Edit" : "Add New "} Veto Sequence Item`}
      size="lg"
    >
      <Stack align="flex-start">
        <Stack align="center" spacing="xs">
          <AspectRatio ratio={1 / 1} sx={{ width: 110 }}>
            <Card
              withBorder
              sx={(theme) => ({
                width: 200,
                backgroundColor:
                  theme.colors[
                    action === "ban"
                      ? "red"
                      : action === "pick"
                      ? "blue"
                      : "green"
                  ],
              })}
            >
              <Stack align="center" spacing={0}>
                <Title order={1} align="center">
                  {sequenceNumber + 1}
                </Title>
                <Text align="center" size="xs">
                  Sequence No.
                </Text>
              </Stack>
            </Card>
          </AspectRatio>
          <Group spacing="xs">
            <ActionIcon
              variant="light"
              disabled={sequenceNumber === 0}
              onClick={moveSequence("prev")}
            >
              <CaretLeft />
            </ActionIcon>
            <ActionIcon
              variant="light"
              disabled={sequenceNumber >= sequence.length}
              onClick={moveSequence("next")}
            >
              <CaretRight />
            </ActionIcon>
          </Group>
        </Stack>
        <Stack spacing={5}>
          <Text size="sm">Action</Text>
          <SegmentedControl
            color={
              action === "ban" ? "red" : action === "pick" ? "blue" : "green"
            }
            value={action}
            data={[
              {
                label: (
                  <Center>
                    <CircleCheck size={18} />
                    <Text pl="xs" size="sm">
                      Pick
                    </Text>
                  </Center>
                ),
                value: "pick",
              },
              {
                label: (
                  <Center>
                    <CircleOff size={18} />
                    <Text pl="xs" size="sm">
                      Ban
                    </Text>
                  </Center>
                ),
                value: "ban",
              },
              {
                label: (
                  <Center>
                    <CircleDashed size={18} />
                    <Text pl="xs" size="sm">
                      Decider
                    </Text>
                  </Center>
                ),
                value: "decider",
              },
            ]}
            onChange={(value) => setValue("action", value as VetoAction)}
          />
        </Stack>
        {!!modeOptions.length && (
          <Select
            clearable
            data={modeOptions}
            label="Mode (optional)"
            value={mode || ""}
            onChange={(value) => setValue("mode", value)}
            itemComponent={ItemComponent}
          />
        )}

        {action !== "decider" && (
          <>
            <Stack spacing={5}>
              <Text size="sm">
                Map <b>{action.toUpperCase()}</b> Actor
              </Text>
              <SegmentedControl
                value={mapActor || ""}
                data={[
                  {
                    label: (
                      <Center>
                        <Coin size={18} />
                        <Text pl="xs" size="sm">
                          Coin Flip Winner
                        </Text>
                      </Center>
                    ),
                    value: "winner",
                  },
                  {
                    label: (
                      <Center>
                        <CoinOff size={18} />
                        <Text pl="xs" size="sm">
                          Coin Flip Loser
                        </Text>
                      </Center>
                    ),
                    value: "loser",
                  },
                ]}
                onChange={(value) =>
                  setValue("mapActor", value as CoinTeamResult)
                }
              />
            </Stack>
            <Stack spacing={5}>
              <Text size="sm">Who chooses which side to play</Text>
              <SegmentedControl
                value={sideActor || ""}
                data={[
                  {
                    label: (
                      <Center>
                        <Coin size={18} />
                        <Text pl="xs" size="sm">
                          Coin Flip Winner
                        </Text>
                      </Center>
                    ),
                    value: "winner",
                  },
                  {
                    label: (
                      <Center>
                        <CoinOff size={18} />
                        <Text pl="xs" size="sm">
                          Coin Flip Loser
                        </Text>
                      </Center>
                    ),
                    value: "loser",
                  },
                ]}
                onChange={(value) =>
                  setValue("sideActor", value as CoinTeamResult)
                }
              />
            </Stack>
          </>
        )}
        <Group
          mt="md"
          sx={{
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Switch
            label={isEdit ? "Go to next sequence?" : "Add more sequence?"}
            checked={addMore}
            onChange={() => setAddMore((s) => !s)}
          />
          <Button onClick={onSubmit}>
            {isEdit ? "Update" : "Add"} Veto Sequence
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}

export default MatchVetoSequenceItemModal
