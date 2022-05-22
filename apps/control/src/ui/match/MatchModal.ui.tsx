import { Modal, ModalProps } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { FC } from "react"
import MatchForm from "./MatchForm.ui"

interface MatchModalProps extends ModalProps {
  match?: SanitizedSeries
}
const MatchModal: FC<MatchModalProps> = ({ match, ...props }) => {
  return (
    <Modal
      size="xl"
      {...props}
      title={match?.id ? "Edit Series" : "Add Custom Series"}
    >
      <MatchForm
        match={match}
        onCancel={props.onClose}
        afterSubmit={props.onClose}
      />
    </Modal>
  )
}
export default MatchModal
