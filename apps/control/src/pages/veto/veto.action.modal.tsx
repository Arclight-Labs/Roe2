import { Modal, ModalProps, Stack } from "@mantine/core"
import VetoActionMap from "./veto.action.map"
import VetoActionSide from "./veto.action.side"
import { useVeto } from "./Veto.hook"

interface Props extends ModalProps {
  hook: ReturnType<typeof useVeto>
}
const VetoActionModal = ({ hook, ...props }: Props) => {
  const { sequenceItem: item } = hook

  const action = item.mapPicked ? "side" : "map"

  return (
    <Modal
      centered
      {...props}
      title={
        action === "side"
          ? "Choose which side to play first"
          : `${item.action?.toUpperCase()} a map`
      }
    >
      <Stack>
        {action === "side" ? (
          <VetoActionSide hook={hook} onClose={props.onClose} />
        ) : (
          <VetoActionMap hook={hook} onClose={props.onClose} />
        )}
      </Stack>
    </Modal>
  )
}

export default VetoActionModal
