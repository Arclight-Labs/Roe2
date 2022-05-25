import { Box, Select, SelectItem, Switch, Text } from "@mantine/core"
import { useInputState, useToggle } from "@mantine/hooks"
import { Live, LowerthirdData } from "interface/ws"
import { useLt } from "utils/hooks"
import { useBSave } from "../../context/bsave/bsave.hook"
import { setLive } from "utils/socket/events"
import { InputHTMLAttributes, useState } from "react"

const TickerState = () => {
  const { mode, show, data } = useLt()
  const bSave = useBSave()

  const toggleLowerThirds = () => {
    const toggleLT: Partial<Live> = {
      lt: { show: !show, data, mode },
    }
    setLive(toggleLT)
    bSave(toggleLT)
  }

  const onModeSelect = (modeValue: keyof LowerthirdData | null) => {
    const changeMode: Partial<Live> = {
      lt: { mode: modeValue || "ticker", data, show },
    }
    setLive(changeMode)
    bSave(changeMode)
  }

  const modeMap: SelectItem[] = Object.keys(data)
    .sort()
    .map((mode) => ({
      value: mode,
      label: mode,
    }))

  return (
    <Box sx={{ width: 200 }}>
      <Switch
        label="Toggle Lower Thirds"
        checked={show}
        onChange={toggleLowerThirds}
      />
      {show ? <Text>ON LOWER THIRDS</Text> : <Text>OFF BOI</Text>}

      <Select
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        label="Lower Third Mode"
        placeholder="Pick a mode"
        data={modeMap}
        value={mode}
        onChange={(mode) => onModeSelect(mode as keyof LowerthirdData | null)}
      />

      <Text>{mode}</Text>
    </Box>
  )
}

export default TickerState
