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

interface AdjTextFormProps<T extends AdjFormTextProps = {}> {
  name: keyof T
  textInputProps?: TextInputProps
}
const AdjTextForm = <T extends AdjFormTextProps>({
  name,
  textInputProps,
}: AdjTextFormProps<T>) => {
  const [disabled, toggle] = useToggle(false, [false, true])
  const { register, setValue } = useFormContext<AdjFormTextProps>()
  const onChange: SliderProps["onChange"] = (value) => {
    setValue(`${name}.size`, value)
  }

  const onToggle: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    if (checked) {
      toggle(true)
      setValue(`${name}.size`, 32)
      return
    }
    toggle(false)
    setValue(`${name}.size`, 0)
  }

  return (
    <Stack>
      <TextInput {...textInputProps} {...register(`${name}.text`)}>
        AdjTextForm
      </TextInput>
      <Group noWrap>
        <Switch onChange={onToggle} />
        <Slider
          disabled={disabled}
          onChange={onChange}
          label={(value) => `${value}px`}
        />
      </Group>
    </Stack>
  )
}

export default AdjTextForm
