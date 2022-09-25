import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal, ModalProps, Stack, TextInput } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  Veto,
  VetoActor,
  vetoJoinSchema,
  VetoPasswordType,
} from "utils/schema/veto.schema"
import { useWsAction } from "utils/socket"
import { v4 } from "uuid"

interface Props extends ModalProps {
  accessToken: string
  veto: Veto
  seriesId: string
  socketId: string
  teamSide: VetoPasswordType
}
const VetoActorModal = ({
  accessToken,
  veto,
  socketId,
  teamSide,
  seriesId,
  ...props
}: Props) => {
  const [vetoActor, setVetoActor] = useLocalStorage<{
    name: string
    uuid: string
  } | null>({
    key: "vetoActor",
    defaultValue: null,
    getInitialValueInEffect: true,
  })
  const { vetoJoin } = useWsAction()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VetoActor>({
    defaultValues: {
      name: "",
      socketId,
      type: teamSide,
      uuid: v4(),
      ready: false,
    },
    resolver: zodResolver(vetoJoinSchema),
  })

  const onSubmit = handleSubmit((data) => {
    setVetoActor({ name: data.name, uuid: data.uuid })
    vetoJoin(accessToken)(seriesId, data)
  }, console.error)

  useEffect(() => {
    if (!vetoActor) return
    vetoJoin(accessToken)(seriesId, {
      name: vetoActor.name,
      type: teamSide,
      uuid: vetoActor.uuid,
    })
  }, [vetoActor])

  return (
    <Modal {...props} title="Who are you?" withCloseButton={false} centered>
      <Stack>
        <TextInput
          {...register("name")}
          label="In-Game Name"
          error={errors.name?.message}
        />
        <Button onClick={onSubmit} sx={{ alignSelf: "flex-end" }} size="xs">
          Submit
        </Button>
      </Stack>
    </Modal>
  )
}

export default VetoActorModal
