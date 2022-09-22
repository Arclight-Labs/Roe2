import { Alert, Button, SimpleGrid, Stack } from "@mantine/core"
import { Control, useFieldArray, UseFormSetValue } from "react-hook-form"
import { Bulb, Plus } from "tabler-icons-react"
import { VetoSettings } from "utils/schema/veto.schema"
import { v4 } from "uuid"
import MatchVetoMapPoolItemForm from "./MatchVetoMapPoolItemForm"

interface Props {
  control: Control<VetoSettings>
  setValue: UseFormSetValue<VetoSettings>
}

const MatchVetoMapPoolForm = ({ control, setValue }: Props) => {
  const { fields, append, remove } = useFieldArray({ control, name: "mapPool" })

  const addNewMap = () => {
    append({
      id: v4(),
      imageUrl: "",
      name: `Map #${fields.length + 1}`,
    })
  }

  return (
    <Stack>
      <Alert icon={<Bulb size={16} />}>Maps to veto</Alert>
      <Button
        sx={{ alignSelf: "start" }}
        onClick={addNewMap}
        leftIcon={<Plus size={16} />}
      >
        Add Map
      </Button>
      <SimpleGrid
        cols={3}
        spacing="md"
        breakpoints={[
          { maxWidth: "sm", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {fields.map((field, index) => (
          <MatchVetoMapPoolItemForm
            key={index}
            control={control}
            remove={remove}
            field={field}
            index={index}
            setValue={setValue}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default MatchVetoMapPoolForm
