import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, LoadingOverlay, Stack, TextInput } from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { nanoid } from "@reduxjs/toolkit"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview } from "interface"
import { FormEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { useParticipants } from "utils/hooks"
import { useWsAction } from "utils/socket"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useRoom } from "../../context/room/Room.hooks"
import { DropzoneContent } from "../DropzoneContent.ui"
import { playerSchema, PlayerSchema } from "utils/schema/player.schema"
import { DeviceFloppy, Trash } from "tabler-icons-react"
import { useBSave } from "../../context/bsave/bsave.hook"

export interface PlayerProps {
  uid?: string
  username: string
  photoURL: string
}
interface PlayerFormProps {
  teamId: string
  player: PlayerProps
  onCancel?: VoidFunction
  afterSubmit?: VoidFunction
}
const PlayerForm = ({
  player,
  teamId,
  onCancel,
  afterSubmit,
}: PlayerFormProps) => {
  const bSave = useBSave()
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState<FilePreview>(new FilePreview())
  const { setParticipant } = useWsAction()
  const { participants } = useParticipants()
  const room = useRoom()
  const { auth } = useAuth()
  const { handleSubmit, setValue, register } = useForm<PlayerSchema>({
    defaultValues: {
      username: player?.username ?? "",
      photoURL: player?.photoURL ?? "",
    },
    resolver: zodResolver(playerSchema),
  })
  const playerId = player.uid || nanoid()

  const saveFn = handleSubmit((data) => {
    const participantData = {
      ...participants[teamId],
      players: {
        ...participants[teamId].players,
        [playerId]: {
          ...participants[teamId].players[playerId],
          ...data,
          uid: playerId,
          _username: data.username.toLowerCase(),
        },
      },
    }
    setParticipant(teamId, participantData)
    bSave({ [`participants.${teamId}`]: participantData })
    setLoading(false)
    afterSubmit?.()
  })

  const uploadAndSet: FormEventHandler = async (e) => {
    e.preventDefault()
    if (!auth) return
    if (!photo.file) return saveFn(e)

    setLoading(true)
    const uploadPath = `public/user/${auth.uid}/room/${room?.id}/players/${playerId}`
    const uploadRef = ref(storage, uploadPath)
    const snap = await uploadBytes(uploadRef, photo.file)
    const downloadUrl = await getDownloadURL(snap.ref)
    setValue("photoURL", downloadUrl)
    saveFn(e)
  }

  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return
    setPhoto(new FilePreview(file))
  }

  const onDelete = () => {}

  return (
    <form onSubmit={uploadAndSet}>
      <Stack>
        <LoadingOverlay visible={loading} />
        <TextInput label="Username" {...register("username")} data-autofocus />

        <Dropzone multiple={false} onDrop={onDrop} accept={IMAGE_MIME_TYPE}>
          {(status) => (
            <DropzoneContent
              status={status}
              minHeight={120}
              preview={[photo.path || player?.photoURL || ""]}
            />
          )}
        </Dropzone>

        <Group position="apart" style={{ marginTop: 15 }}>
          <Button
            variant="subtle"
            size="xs"
            color="red"
            leftIcon={<Trash size={18} />}
          >
            Delete
          </Button>

          <Button type="submit" size="xs" leftIcon={<DeviceFloppy size={18} />}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
export default PlayerForm
