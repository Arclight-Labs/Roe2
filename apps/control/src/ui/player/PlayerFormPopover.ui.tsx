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
      withArrow
      shadow="xl"
      closeOnClickOutside={false}
      transition="pop"
      width={260}
      {...props}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown title={player.uid ? "Edit Player" : "Add Player"}>
        <PlayerForm
          teamId={teamId}
          player={{
            photoURL: player.photoURL,
            uid: player.uid,
            username: player.username,
            stats: player.stats ?? {},
            photoAdj: player.photoAdj,
          }}
          onCancel={props.onClose}
          afterSubmit={props.onClose}
        />
      </Popover.Dropdown>
    </Popover>
  )
}
export default PlayerFormPopover
