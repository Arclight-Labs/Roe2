import { Popover, PopoverProps } from "@mantine/core"
import { PropsWithChildren } from "react"
import PlayerForm, { PlayerProps } from "./PlayerForm.ui"

interface PlayerAvatarProps extends Omit<PopoverProps, "target"> {
  player: PlayerProps
  teamId: string
}
const PlayerFormPopover = ({
  teamId,
  player,
  children,
  ...props
}: PropsWithChildren<PlayerAvatarProps>) => {
  return (
    <Popover
      position="bottom"
      placement="center"
      // withArrow
      shadow="xl"
      withCloseButton
      closeOnClickOutside={false}
      title={player.uid ? "Edit Player" : "Add Player"}
      transition="pop"
      width={260}
      {...props}
      target={children}
    >
      <PlayerForm
        teamId={teamId}
        player={{
          photoURL: player.photoURL,
          uid: player.uid,
          username: player.username,
          stats: player.stats ?? {},
        }}
        onCancel={props.onClose}
        afterSubmit={props.onClose}
      />
    </Popover>
  )
}
export default PlayerFormPopover
