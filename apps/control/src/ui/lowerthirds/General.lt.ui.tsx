import { Group, GroupProps, Stack, StackProps, Switch } from "@mantine/core"
import { HotkeyItem, useHotkeys } from "@mantine/hooks"
import { Live, LowerthirdData } from "interface/ws"
import { FC } from "react"
import { Ad, Ad2, ChartBar, ClearFormatting } from "tabler-icons-react"
import { useLt } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import LowerthirdModeCard from "./ModeCard.lt.ui"

interface Props extends StackProps {
  groupProps?: GroupProps
}
const LowerthirdGeneral: FC<Props> = ({ groupProps, ...props }) => {
  const { mode, show, data } = useLt()
  const { accessToken } = useAuth()
  const toggleLowerThirds = () => {
    const toggleLT: Partial<Live> = {
      lt: { show: !show, data, mode },
    }
    setLive(accessToken)(toggleLT)
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
          setLive(accessToken)(newData)
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
        <LowerthirdModeCard
          value={"ticker"}
          label="Ticker"
          icon={<ClearFormatting />}
          hotkey="ctrl + 1"
        />
        <LowerthirdModeCard
          value={"ad"}
          label="Solo Ad"
          icon={<Ad />}
          hotkey="ctrl + 2"
        />
        <LowerthirdModeCard
          value={"adPool"}
          label="Ad Pool"
          icon={<Ad2 />}
          hotkey="ctrl + 3"
        />
        <LowerthirdModeCard
          value={"matchPoll"}
          label="Match Poll"
          icon={<ChartBar />}
          hotkey="ctrl + 4"
        />
      </Group>
    </Stack>
  )
}

export default LowerthirdGeneral
