import { Alert, Button, Stack } from "@mantine/core"
import { Control, useFieldArray, UseFormSetValue } from "react-hook-form"
import { Bulb, Plus } from "tabler-icons-react"
import { defaultVetoMode } from "utils/general/defaultValues"
import { VetoMap, VetoMode, VetoSettings } from "utils/schema/veto.schema"
import { v4 } from "uuid"
import MatchVetoModesItemForm from "./MatchVetoModesItemForm"

interface Props {
  control: Control<VetoSettings>
  setValue: UseFormSetValue<VetoSettings>
  mapPool: VetoMap[]
  modes: VetoMode[]
}
const MatchVetoModesForm = ({
  control,
  setValue,
  modes = [],
  mapPool = [],
}: Props) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: "modes",
  })

  const addNewMode = () => {
    append({
      id: v4(),
      name: `Mode #${fields.length + 1}`,
      imageUrl: "",
      mapPool: [],
    })
  }

  return (
    <Stack>
      <Alert icon={<Bulb size={16} />}>Maps to veto</Alert>
      <Button
        sx={{ alignSelf: "start" }}
        onClick={addNewMode}
        leftIcon={<Plus size={16} />}
      >
        Add New Mode
      </Button>
      <Stack>
        {fields.map((field, index) => (
          <MatchVetoModesItemForm
            key={index}
            control={control}
            remove={remove}
            field={field}
            index={index}
            mode={modes[index] ?? defaultVetoMode}
            setValue={setValue}
            mapPool={mapPool}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default MatchVetoModesForm
