import { Card, Group, Kbd, Radio, Text } from "@mantine/core"
import { Live, LowerthirdData } from "interface/ws"
import { FC, ReactNode } from "react"
import { useLt } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useBSave } from "../../context/bsave/bsave.hook"

interface Props {
  value: keyof LowerthirdData
  label: string
  hotkey?: string
  icon?: ReactNode
}
const LowerthirdModeCard: FC<Props> = ({ value, label, hotkey, icon }) => {
  const { mode, data, show } = useLt()
  const { accessToken } = useAuth()
  const bSave = useBSave()
  const onClick = () => {
    const saveData: Partial<Live> = {
      lt: { mode: (value as keyof LowerthirdData) || "ticker", data, show },
    }
    setLive(accessToken)(saveData)
    bSave(saveData)
  }
  return (
    <Card onClick={onClick} sx={{ cursor: "pointer" }} withBorder>
      <Group noWrap>
        <Radio size="lg" value={value} checked={mode === value} />
        {icon}
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            <Kbd>{hotkey}</Kbd>
          </Text>
        </div>
      </Group>
    </Card>
  )
}

export default LowerthirdModeCard
