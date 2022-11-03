import {
  ActionIcon,
  Button,
  Card,
  CloseButton,
  Group,
  Popover,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { FC, MouseEventHandler } from "react"
import { Control, useFieldArray, useWatch } from "react-hook-form"
import { Plus, ReportAnalytics } from "tabler-icons-react"
import { PlayerSchema } from "utils/schema/player.schema"
import Confirm from "../popups/Confirm.ui"

interface Props {
  control: Control<PlayerSchema>
}
const PlayerFormStat: FC<Props> = ({ control }) => {
  const [opened, toggler] = useToggle([false, true])
  const toggle = () => toggler()
  const close = () => toggler(false)
  const { stats = [] } = useWatch({ control })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stats",
  })

  const onAdd: MouseEventHandler<HTMLButtonElement> = () => {
    const tempId = stats.length + 1
    append({
      id: `stat-${tempId}`,
      name: `Stat #${tempId}`,
      value: "",
    })
  }

  return (
    <Popover
      opened={opened}
      onClose={close}
      position="right-end"
      withArrow
      width={300}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Tooltip label="Stats" withArrow>
          <ActionIcon size="xl" onClick={toggle}>
            <ReportAnalytics />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown title="Stats">
        <Stack>
          <Stack sx={{ maxHeight: 400, overflowY: "auto" }}>
            {fields.map((field, index) => (
              <Card
                p="xs"
                key={field.id}
                sx={{ border: "1px solid rgba(0,0,0,.1)", flexShrink: 0 }}
                shadow="xs"
              >
                <Confirm
                  width={100}
                  onConfirm={() => remove(index)}
                  dropdownProps={{
                    sx: { position: "absolute", top: 10, right: 10 },
                  }}
                >
                  <CloseButton size="xs" />
                </Confirm>
                <Group noWrap align="center">
                  <TextInput
                    {...control.register(`stats.${index}.id`)}
                    size="xs"
                    label="Stat ID"
                  />
                </Group>
                <Group noWrap>
                  <TextInput
                    {...control.register(`stats.${index}.name`)}
                    size="xs"
                    label="Label"
                  />

                  <TextInput
                    {...control.register(`stats.${index}.value`)}
                    label="Value"
                    size="xs"
                  />
                </Group>
              </Card>
            ))}
          </Stack>
          <Group position="apart">
            <Button leftIcon={<Plus size={16} />} size="xs" onClick={onAdd}>
              Add
            </Button>
            <Button onClick={close} size="xs" variant="light">
              Close
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default PlayerFormStat
