import {
  Group,
  Slider,
  SliderProps,
  Stack,
  Switch,
  Text,
  NumberInput,
  NumberInputProps,
} from "@mantine/core"
import { Dropzone, DropzoneProps } from "@mantine/dropzone"
import { useToggle } from "@mantine/hooks"
import { FilePreview } from "interface"
import { AdjImage, AdjSize } from "interface/ws/Live.interface"
import { ChangeEventHandler, FC } from "react"
import { useFormContext } from "react-hook-form"
import { DropzoneContent } from "../DropzoneContent.ui"

type AdjImageProps = Record<string, AdjImage | any>
interface AdjImageDropzoneProps {
  preview?: string
  file: FilePreview
  setFile: (file: FilePreview) => void
  name: string
}
const AdjImageDropzone: FC<AdjImageDropzoneProps> = ({
  file,
  preview = "",
  setFile,
  name,
}) => {
  const [isDisabled, toggle] = useToggle(false, [false, true])
  const { setValue, watch } = useFormContext<AdjImageProps>()
  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return
    setFile(new FilePreview(file))
  }

  const onSlide: SliderProps["onChange"] = (value) => {
    setValue(path("scale"), parseFloat(value.toFixed(2)))
  }

  const path = (prop: string) => {
    return `${name}.adj.${prop}`
  }

  const onToggle: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    if (checked) {
      setValue(path("scale"), 0)
      toggle(false)
      return
    }
    setValue(path("scale"), 0)
    toggle(true)
  }

  const onChange =
    (key: keyof AdjSize): NumberInputProps["onChange"] =>
    (val) => {
      setValue(path(key), val ?? 0)
    }

  return (
    <Stack spacing="xs">
      <Stack>
        <Text size="sm">Image</Text>
        <Dropzone onDrop={onDrop}>
          {(status) => (
            <DropzoneContent status={status} preview={[file.path || preview]} />
          )}
        </Dropzone>
      </Stack>
      <Stack spacing="xs">
        <Group>
          <NumberInput
            sx={{ flex: 1 }}
            label="Width"
            value={watch(path("w"))}
            onChange={onChange("w")}
          />
          <NumberInput
            sx={{ flex: 1 }}
            label="Height"
            value={watch(path("h"))}
            onChange={onChange("h")}
          />
        </Group>
        <Group>
          <NumberInput
            sx={{ flex: 1 }}
            label="Horizontal offset"
            value={watch(path("x"))}
            onChange={onChange("x")}
          />
          <NumberInput
            sx={{ flex: 1 }}
            label="Vertical Offset"
            value={watch(path("y"))}
            onChange={onChange("y")}
          />
        </Group>
        <Group noWrap>
          <Switch
            checked={!isDisabled}
            onChange={onToggle}
            label="Enable scaler"
          />
          <Slider
            disabled={isDisabled}
            value={watch(path("scale")) as number}
            onChange={onSlide}
            min={0}
            max={5}
            label={(val) => `x${val + 1}`}
            step={0.05}
            sx={{ flex: 1 }}
          />
        </Group>
      </Stack>
    </Stack>
  )
}

export default AdjImageDropzone
