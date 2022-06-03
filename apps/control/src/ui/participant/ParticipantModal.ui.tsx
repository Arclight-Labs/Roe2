import {
  ActionIcon,
  Divider,
  Group,
  Modal,
  ModalProps,
  Stack,
} from "@mantine/core"
import { useState } from "react"
import { Plus } from "tabler-icons-react"
import { useParticipants } from "utils/hooks"
import { usePermission } from "../../hooks/usePermission.hook"
import PlayerAvatar from "../player/PlayerAvatar.ui"
import PlayerFormPopover from "../player/PlayerFormPopover.ui"
import ParticipantForm, { ParticipantProps } from "./ParticipantForm.ui"

interface ParticipantModalProps extends ModalProps {
  participant: ParticipantProps
}
const ParticipantModal = ({ participant, ...props }: ParticipantModalProps) => {
  const isAllowed = usePermission
  const teamId = participant?.teamId
  const isEdit = !!teamId

  const [playerOpened, setPlayerOpened] = useState(false)
  const togglePlayer = () => setPlayerOpened(!playerOpened)
  const closePlayer = () => setPlayerOpened(false)

  const { participants = {} } = useParticipants()
  const team = participants[teamId || ""]
  return (
    <Modal
      size="lg"
      {...props}
      title={isEdit ? "Edit Participant" : "Add participant"}
    >
      <Stack>
        {team && (
          <Group spacing="xs" align="center">
            {Object.entries(team.players).map(([id, player]) => (
              <PlayerAvatar key={id} player={player} teamId={team.teamId} />
            ))}
            <PlayerFormPopover
              teamId={team.teamId}
              player={{ username: "", photoURL: "" }}
              opened={playerOpened}
              onClose={closePlayer}
            >
              <ActionIcon
                disabled={!isAllowed}
                radius="xl"
                variant="outline"
                onClick={togglePlayer}
              >
                <Plus />
              </ActionIcon>
            </PlayerFormPopover>
          </Group>
        )}
        <Divider />
        <ParticipantForm
          participant={participant}
          onCancel={props.onClose}
          afterSubmit={props.onClose}
        />
      </Stack>
    </Modal>
  )
}
export default ParticipantModal
