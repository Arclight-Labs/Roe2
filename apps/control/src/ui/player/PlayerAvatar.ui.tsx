import { Avatar, Tooltip } from "@mantine/core"
import { useState } from "react"
import { usePermission } from "../../hooks/usePermission.hook"
import { PlayerProps } from "./PlayerForm.ui"
import PlayerFormPopover from "./PlayerFormPopover.ui"

interface PlayerAvatarProps {
  player: PlayerProps
  teamId: string
}
const PlayerAvatar = ({ player, teamId }: PlayerAvatarProps) => {
  const isAllowed = usePermission()
  const [opened, setOpened] = useState(false)
  const toggle = () => setOpened(!opened)
  const close = () => setOpened(false)
  return (
    <PlayerFormPopover
      opened={opened}
      onClose={close}
      player={player}
      teamId={teamId}
    >
      <Tooltip transition="slide-up" label={player.username} withArrow>
        <Avatar
          onClick={isAllowed ? toggle : undefined}
          sx={{ cursor: "pointer" }}
          radius="xl"
          src={player.photoURL}
        >
          {player.username[0] ?? "?"}
        </Avatar>
      </Tooltip>
    </PlayerFormPopover>
  )
}
export default PlayerAvatar
