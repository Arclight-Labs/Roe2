import { ActionIcon, Menu, MenuProps } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { Live } from "interface/ws"
import { MouseEventHandler, useState } from "react"
import {
  Ban,
  ListDetails,
  Menu2,
  Pencil,
  PlayerTrackNext,
  Select,
} from "tabler-icons-react"
import { useLive, useMatches } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { usePermission } from "../../hooks/usePermission.hook"

interface MatchMenuProps extends Omit<MenuProps, "children"> {
  match: SanitizedSeries
  open: VoidFunction
  openVeto: VoidFunction
}
const MatchMenu = ({ match, open, openVeto, ...props }: MatchMenuProps) => {
  const [opened, setOpened] = useState(false)
  const isAllowed = usePermission()
  const { live } = useLive()

  const { isActive, isNext, inSchedule } = useMatches()

  const matchId = `${match.id}`
  const active = isActive(matchId)
  const next = isNext(matchId)
  const scheduled = inSchedule(matchId)
  const { accessToken } = useAuth()
  const isReady = match.teamA.id && match.teamB.id

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setOpened(!opened)
  }
  const close = () => setOpened(false)
  const setAs =
    (key: "activeMatch" | "nextMatch"): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.stopPropagation()
      const data: Partial<Live> = { [key]: matchId }
      setLive(accessToken)(data)
    }

  const clearAs =
    (key: "activeMatch" | "nextMatch"): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.stopPropagation()
      const data: Partial<Live> = { [key]: "" }
      setLive(accessToken)(data)
    }

  const addToSchedule: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (scheduled) return
    const item = { matchId: matchId, date: new Date() }
    const schedule = [...live.schedule, item]
    const data: Partial<Live> = { schedule }
    setLive(accessToken)(data)
  }

  const removeFromSchedule: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    const schedule = live.schedule.filter((s) => s.matchId !== matchId)
    const data: Partial<Live> = { schedule }
    setLive(accessToken)(data)
  }

  const editMatch: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    open()
  }

  const editVeto: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    openVeto()
  }

  return (
    <Menu
      {...props}
      position="bottom-end"
      opened={opened}
      onClose={close}
      transition="pop-top-right"
    >
      <Menu.Target>
        <ActionIcon onClick={isAllowed ? onClick : undefined}>
          <Menu2 size={18}></Menu2>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
        <Menu.Item onClick={editMatch} icon={<Pencil size={18} />}>
          Edit
        </Menu.Item>
        <Menu.Item
          disabled={!isReady}
          onClick={editVeto}
          icon={<Ban size={18} />}
        >
          Map Veto
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
      </Menu.Dropdown>
    </Menu>
  )
}

export default MatchMenu
