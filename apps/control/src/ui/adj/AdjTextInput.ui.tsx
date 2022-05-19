import {
  Group,
  Slider,
  SliderProps,
  Stack,
  Switch,
  TextInput,
  TextInputProps,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { AdjText } from "interface/ws/Live.interface"
import { ChangeEventHandler } from "react"
import { useFormContext } from "react-hook-form"

type AdjFormTextProps = Record<string, AdjText>

interface AdjTextInputProps<T extends AdjFormTextProps = {}> {
  name: keyof T
  textInputProps?: TextInputProps
  label?: string
  defaultSize?: number
}
const AdjTextInput = <T extends AdjFormTextProps>({
  name,
  textInputProps,
  label,
  defaultSize = 32,
}: AdjTextInputProps<T>) => {
  const [isDisabled, toggle] = useToggle(true, [false, true])
  const { register, setValue, watch } = useFormContext<AdjFormTextProps>()
  const onChange: SliderProps["onChange"] = (value) => {
    setValue(`${name}.size`, value)
  }

  const onToggle: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    if (checked) {
      setValue(`${name}.size`, defaultSize)
      toggle(false)
      return
    }
    setValue(`${name}.size`, 0)
    toggle(true)
  }

  return (
    <Stack>
      <TextInput
        label={label}
        {...textInputProps}
        {...register(`${name}.text`)}
      />
      <Group noWrap>
        <Switch
          checked={!isDisabled}
          onChange={onToggle}
          label="Custom font size?"
        />
        <Slider
          sx={{ flex: 1 }}
          min={8}
          max={200}
          value={watch(`${name}.size`)}
          disabled={isDisabled}
          onChange={onChange}
          label={(value) => `${value}px`}
        />
      </Group>
    </Stack>
  )
}

export default AdjTextInput
