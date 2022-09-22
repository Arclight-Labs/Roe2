import { Modal, ModalProps } from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import MatchVetoSettingsForm from "./MatchVetoForm"

interface Props extends ModalProps {
  match: SanitizedSeries
}

const MatchVetoModal = ({ match, ...props }: Props) => {
  return (
    <Modal
      {...props}
      centered={false}
      title="Match Veto"
      size="lg"
      closeOnClickOutside={false}
    >
      <MatchVetoSettingsForm onClose={props.onClose} match={match} />
    </Modal>
  )
}

export default MatchVetoModal
