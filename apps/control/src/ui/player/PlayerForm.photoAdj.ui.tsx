import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Card,
  Group,
  Modal,
  NumberInput,
  Slider,
  SliderProps,
  Stack,
  Text,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { AdjSize } from "interface/ws"
import { FC } from "react"
import { Control, Path, UseFormSetValue, useWatch } from "react-hook-form"
import { Resize } from "tabler-icons-react"
import { adjImageStyles } from "utils/general"
import { PlayerSchema } from "utils/schema/player.schema"

interface Props {
  control: Control<PlayerSchema>
  setValue: UseFormSetValue<PlayerSchema>
}
const PlayerFormPhotoAdj: FC<Props> = ({ control, setValue }) => {
  const { photoAdj = {}, photoURL = "" } = useWatch({ control })
  const [open, toggler] = useToggle([false, true])
  const toggle = () => toggler()
  const onClose = () => toggler(false)
  const sample = "https://ogs.gg/wp-content/uploads/2021/10/Misha3-1.png"

  return (
    <div>
      <ActionIcon size="xl" onClick={toggle}>
        <Resize />
      </ActionIcon>
      <Modal
        size="xl"
        opened={open}
        onClose={onClose}
        title="Edit Image"
        zIndex={9999}
      >
        <Stack>
          <Group noWrap align="stretch">
            <Card p={0} sx={{ flex: 1 }}>
              <BackgroundImage
                src={sample}
                sx={{
                  height: 300,
                  width: "100%",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Card>
            <Card p={0} sx={{ flex: 1 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  ...adjImageStyles({
                    adj: photoAdj,
                    URL: photoURL,
                  }),
                }}
              />
            </Card>
          </Group>
          <Stack>
            <AdjustInput
              setValue={setValue}
              name={"x"}
              value={photoAdj?.x || 0}
              label="X offset"
            />
            <AdjustInput
              setValue={setValue}
              name={"y"}
              value={photoAdj?.y || 0}
              label="Y offset"
            />
            <AdjustInput
              setValue={setValue}
              name={"scale"}
              value={photoAdj?.scale || 0}
              label="Scale"
              sliderProps={{
                step: 0.05,
                min: -0.9,
                max: 5,
              }}
            />
          </Stack>
          <Group position="right">
            <Text size="xs">Remember to save your changes!</Text>
            <Button size="xs" variant="light" onClick={onClose}>
              Close
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  )
}

interface AdjustInputProps {
  setValue: UseFormSetValue<PlayerSchema>
  name: keyof AdjSize
  value: number
  label: string
  sliderProps?: SliderProps
}

const AdjustInput: FC<AdjustInputProps> = ({
  setValue,
  name,
  value,
  label,
  sliderProps,
}) => {
  const path: Path<PlayerSchema> = `photoAdj.${name}`
  const onSlide = (value: number) => {
    setValue(path, parseFloat(value.toFixed(2)))
  }

  const onChange = (value: number = 0) => {
    setValue(path, value)
  }

  return (
    <Group noWrap>
      <Text sx={{ width: 80 }} size="sm">
        {label}
      </Text>
      <Slider
        sx={{ flex: 1 }}
        min={-1000}
        max={1000}
        value={value}
        onChange={onSlide}
        {...sliderProps}
      />
      <NumberInput value={value} onChange={onChange} precision={2} />
    </Group>
  )
}

export default PlayerFormPhotoAdj
