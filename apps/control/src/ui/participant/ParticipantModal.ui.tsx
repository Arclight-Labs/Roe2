import { Modal, ModalProps } from "@mantine/core"
import ParticipantForm, { ParticipantProps } from "./ParticipantForm.ui"

interface ParticipantModalProps extends ModalProps {
  participant: ParticipantProps
}
const ParticipantModal = ({ participant, ...props }: ParticipantModalProps) => {
  const isEdit = !!participant?.teamId
  return (
    <Modal
      size="lg"
      {...props}
      title={isEdit ? "Edit Participant" : "Add participant"}
    >
      <ParticipantForm
        participant={participant}
        onCancel={props.onClose}
        afterSubmit={props.onClose}
      />
    </Modal>
  )
}
export default ParticipantModal
