import { Group, GroupProps, Stack, StackProps, Switch } from "@mantine/core"
import { Live, LowerthirdData } from "interface/ws"
import { useLt } from "utils/hooks"
import { useBSave } from "../../context/bsave/bsave.hook"
import { setLive } from "utils/socket/events"
import LowerthirdModeCard from "./ModeCard.lt.ui"
import { FC } from "react"
import { HotkeyItem, useHotkeys } from "@mantine/hooks"

interface Props extends StackProps {
  groupProps?: GroupProps
}
const LowerthirdGeneral: FC<Props> = ({ groupProps, ...props }) => {
  const { mode, show, data } = useLt()
  const bSave = useBSave()

  const toggleLowerThirds = () => {
    const toggleLT: Partial<Live> = {
      lt: { show: !show, data, mode },
    }
    setLive(toggleLT)
    bSave(toggleLT)
  }

  const modes = ["ticker", "ad", "adPool", "matchPoll"]

  useHotkeys([
    ["mod+O", toggleLowerThirds],
    ...modes.map<HotkeyItem>((m, i) => {
      return [
        `mod+${i + 1}`,
        () => {
          const newData: Partial<Live> = {
            lt: {
              data,
              show: mode === m ? !show : true,
              mode: m as keyof LowerthirdData,
            },
          }
          setLive(newData)
          bSave(newData)
        },
      ]
    }),
  ])

  return (
    <Stack {...props}>
      <Switch
        label="Toggle Lower Thirds"
        checked={show}
        onChange={toggleLowerThirds}
      />

      <Group {...groupProps}>
        <LowerthirdModeCard value={"ticker"} label="Ticker" />
        <LowerthirdModeCard value={"ad"} label="Solo Ad" />
        <LowerthirdModeCard value={"adPool"} label="Ad Pool" />
        <LowerthirdModeCard value={"matchPoll"} label="Match Poll" />
      </Group>
    </Stack>
  )
}

export default LowerthirdGeneral
