import {
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Switch,
} from "@mantine/core"
import { Live, LowerthirdData } from "interface/ws"
import { useLt } from "utils/hooks"
import { useBSave } from "../../context/bsave/bsave.hook"
import { setLive } from "utils/socket/events"

const LowerthirdGeneral = () => {
  const { mode, show, data } = useLt()
  const bSave = useBSave()

  const toggleLowerThirds = () => {
    const toggleLT: Partial<Live> = {
      lt: { show: !show, data, mode },
    }
    setLive(toggleLT)
    bSave(toggleLT)
  }

  const onSelect: RadioGroupProps["onChange"] = (value) => {
    const saveData: Partial<Live> = {
      lt: { mode: (value as keyof LowerthirdData) || "ticker", data, show },
    }
    setLive(saveData)
    bSave(saveData)
  }

  return (
    <Stack>
      <Switch
        label="Toggle Lower Thirds"
        checked={show}
        onChange={toggleLowerThirds}
      />

      <RadioGroup value={mode} onChange={onSelect}>
        <Radio value="react" label="React" />
      </RadioGroup>
    </Stack>
  )
}

export default LowerthirdGeneral
