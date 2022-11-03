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

type AdjFormTextProps = { [key: string]: AdjText }

interface AdjTextareaProps<T extends AdjFormTextProps> {
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
  const { register, setValue, watch } = useFormContext<AdjFormTextProps>()
  const keyName = String(name)
  const size = watch(`${keyName}.size`)
  const [isDisabled, toggle] = useToggle([!size, !!size])
  const onChange: SliderProps["onChange"] = (value) => {
    setValue(`${keyName}.size`, value)
  }

  const onToggle: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    if (checked) {
      setValue(`${keyName}.size`, defaultSize)
      toggle(false)
      return
    }
    setValue(`${keyName}.size`, 0)
    toggle(true)
  }

  return (
    <Stack>
      <Textarea
        label={label}
        {...textareaProps}
        {...register(`${keyName}.text`)}
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
          value={size}
          disabled={isDisabled}
          onChange={onChange}
          label={(value) => `${value}px`}
        />
      </Group>
    </Stack>
  )
}

export default AdjTextarea
