import { Alert, Container } from "@mantine/core"
import { useActiveSocket } from "utils/socket"
import { useVeto } from "./Veto.hook"
import VetoWidget from "./Veto.widget.ui"
import VetoActorModal from "./VetoActor.modal"

const VetoPage = () => {
  const socket = useActiveSocket()
  const hook = useVeto()
  const { veto, activeActor, side, accessToken, seriesId } = hook
  const isViewer = !side || !accessToken
  return (
    <Container size="lg" sx={{ height: "100vh" }}>
      {!veto ? (
        <Alert>
          Veto is not set for this match, please contact tournament admins
        </Alert>
      ) : (
        <>
          <VetoActorModal
            seriesId={seriesId}
            onClose={() => {}}
            accessToken={accessToken}
            opened={!!veto && !activeActor && !isViewer && !!socket.id}
            socketId={socket.id}
            teamSide={side}
            veto={veto}
          />
          <VetoWidget hook={hook} />
        </>
      )}
    </Container>
  )
}

export default VetoPage
