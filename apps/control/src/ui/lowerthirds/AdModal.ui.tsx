import { Modal, ModalProps } from "@mantine/core"
import { Ad } from "interface/ws/Live.interface"
import { FC } from "react"
import AdForm from "./AdForm.ui"

interface AdModalProps extends ModalProps {
  ad: Ad
}
const AdModal: FC<AdModalProps> = ({ ad, ...props }) => {
  const isEdit = !!ad.id
  const title = isEdit ? "Edit Ad" : "Create Ad"
  return (
    <Modal size="xl" title={title} withCloseButton {...props}>
      <AdForm ad={ad} afterSubmit={props.onClose} />
    </Modal>
  )
}

export default AdModal
