import { Menu, MenuProps, useMantineTheme } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { Live } from "interface/ws"
import { MouseEventHandler, useState } from "react"
import {
  ListDetails,
  Pencil,
  PlayerTrackNext,
  Select,
} from "tabler-icons-react"
import { useLive, useMatches } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useRoom } from "../../context/room/Room.hooks"
import { usePermission } from "../../hooks/usePermission.hook"

interface MatchMenuProps extends Omit<MenuProps, "children"> {
  match: SanitizedSeries
  open: VoidFunction
}
const MatchMenu = ({ match, open, ...props }: MatchMenuProps) => {
  const [opened, setOpened] = useState(false)
  const isAllowed = usePermission()
  const room = useRoom()
  const { live } = useLive()
  const { isActive, isNext, inSchedule } = useMatches()

  const matchId = `${match.id}`
  const active = isActive(matchId)
  const next = isNext(matchId)
  const scheduled = inSchedule(matchId)

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setOpened(!opened)
  }
  const close = () => setOpened(false)
  const setAs = (key: "activeMatch" | "nextMatch") => () => {
    const data: Partial<Live> = { [key]: matchId }
    setLive(data)
    room?.save(data)
  }

  const clearAs = (key: "activeMatch" | "nextMatch") => () => {
    const data: Partial<Live> = { [key]: "" }
    setLive(data)
    room?.save(data)
  }

  const addToSchedule = () => {
    if (scheduled) return
    const item = { matchId: matchId, date: new Date() }
    const schedule = [...live.schedule, item]
    const data: Partial<Live> = { schedule }
    setLive(data)
    room?.save(data)
  }

  const removeFromSchedule = () => {
    const schedule = live.schedule.filter((s) => s.matchId !== matchId)
    const data: Partial<Live> = { schedule }
    setLive(data)
    room?.save(data)
  }

  return (
    <Menu
      {...props}
      position="bottom"
      placement="end"
      opened={opened}
      onClose={close}
      transition="pop-top-right"
      onClick={isAllowed ? onClick : undefined}
    >
      <Menu.Item onClick={open} icon={<Pencil size={18} />}>
        Edit
      </Menu.Item>

      {!active ? (
        <Menu.Item onClick={setAs("activeMatch")} icon={<Select size={18} />}>
          Set as active match
        </Menu.Item>
      ) : (
        <Menu.Item
          onClick={clearAs("activeMatch")}
          icon={<Select size={18} />}
          color="red"
        >
          Unset as active match
        </Menu.Item>
      )}

      {!next ? (
        <Menu.Item
          onClick={setAs("nextMatch")}
          icon={<PlayerTrackNext size={18} />}
        >
          Set as next match
        </Menu.Item>
      ) : (
        <Menu.Item
          onClick={clearAs("nextMatch")}
          icon={<PlayerTrackNext size={18} />}
          color="red"
        >
          Unset as next match
        </Menu.Item>
      )}

      {!scheduled ? (
        <Menu.Item onClick={addToSchedule} icon={<ListDetails size={18} />}>
          Add to schedule
        </Menu.Item>
      ) : (
        <Menu.Item
          onClick={removeFromSchedule}
          icon={<ListDetails size={18} />}
          color="red"
        >
          Remove from schedule
        </Menu.Item>
      )}
    </Menu>
  )
}

export default MatchMenu
