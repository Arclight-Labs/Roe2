import { Avatar, Popover, Tooltip, UnstyledButton } from "@mantine/core"
import { SanitizedUser } from "interface/waypoint"
import { useState } from "react"
import PlayerForm from "./PlayerForm.ui"

interface PlayerAvatarProps {
  player: SanitizedUser
  teamId: string
}
const PlayerAvatar = ({ player, teamId }: PlayerAvatarProps) => {
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  return (
    <Popover
      opened={opened}
      onClose={close}
      position="bottom"
      placement="end"
      withCloseButton
      title="Edit user"
      transition="pop-top-right"
      width={260}
      target={
        <Tooltip transition="slide-up" label={player.username} withArrow>
          <Avatar
            onClick={open}
            sx={{ cursor: "pointer" }}
            radius="xl"
            src={player.photoURL}
          >
            {player.username[0] ?? "?"}
          </Avatar>
        </Tooltip>
      }
    >
      <PlayerForm
        teamId={teamId}
        player={{
          photoURL: player.photoURL,
          uid: player.uid,
          username: player.username,
        }}
        onCancel={close}
        afterSubmit={close}
      />
    </Popover>
  )
}
export default PlayerAvatar
