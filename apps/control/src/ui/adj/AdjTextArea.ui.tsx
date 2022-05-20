import {
  Group,
  Slider,
  SliderProps,
  Stack,
  Switch,
  Textarea,
  TextareaProps,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { AdjText } from "interface/ws/Live.interface"
import { ChangeEventHandler } from "react"
import { useFormContext } from "react-hook-form"

type AdjFormTextProps = Record<string, AdjText>

interface AdjTextareaProps<T extends AdjFormTextProps = {}> {
  name: keyof T
  label?: string
  textareaProps?: TextareaProps
  defaultSize?: number
}
const AdjTextarea = <T extends AdjFormTextProps>({
  name,
  label,
  textareaProps,
  defaultSize = 16,
}: AdjTextareaProps<T>) => {
  const [isDisabled, toggle] = useToggle(false, [false, true])
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
      <Textarea
        label={label}
        {...textareaProps}
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

export default AdjTextarea
