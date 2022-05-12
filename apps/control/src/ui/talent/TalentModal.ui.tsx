import { Modal, ModalProps } from "@mantine/core"
import { User } from "interface/db"
import { FC } from "react"
import TalentForm from "./TalentForm.ui"

interface TalentModalProps extends ModalProps {
  data: User
}
const TalentModal: FC<TalentModalProps> = ({ data, ...props }) => {
  const uid = data.uid
  return (
    <Modal {...props} title={uid ? "Edit Talent" : "Add Talent"}>
      <TalentForm
        data={data}
        onCancel={props.onClose}
        afterSubmit={props.onClose}
      />
    </Modal>
  )
}
export default TalentModal
