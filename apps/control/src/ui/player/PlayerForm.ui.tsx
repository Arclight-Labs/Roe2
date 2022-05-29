import { zodResolver } from "@hookform/resolvers/zod"
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
} from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { nanoid } from "@reduxjs/toolkit"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview } from "interface"
import { FormEventHandler, useRef, useState } from "react"
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
import Confirm from "../popups/Confirm.ui"
import { Stat } from "interface/waypoint/SanitizedUser.interface"
import { defaultAdjSize, fn } from "utils/general"
import PlayerFormStat from "./PlayerForm.stat.ui"
import PlayerFormPhotoAdj from "./PlayerForm.photoAdj.ui"
import { AdjSize } from "interface/ws/Live.interface"

export interface PlayerProps {
  uid?: string
  username: string
  photoURL: string
  stats?: Record<string, Stat>
  photoAdj?: AdjSize
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
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState<FilePreview>(new FilePreview())
  const { setParticipant } = useWsAction()
  const { participants } = useParticipants()
  const room = useRoom()
  const { auth } = useAuth()
  const { handleSubmit, setValue, register, control } = useForm<PlayerSchema>({
    defaultValues: {
      username: player?.username ?? "",
      photoURL: player?.photoURL ?? "",
      stats: Object.values(player?.stats ?? {}),
      photoAdj: { ...defaultAdjSize, ...player.photoAdj },
    },
    resolver: zodResolver(playerSchema),
  })
  const isEdit = !!player.uid
  const playerId = player.uid || nanoid()

  const saveFn = handleSubmit(({ stats: statArr = [], ...data }) => {
    const team = participants[teamId]
    const teamPlayers = team?.players ?? {}
    const playerIds = [...new Set([...(team.playerIds ?? []), playerId])]

    const stats = statArr.reduce<Record<string, Stat>>(
      (acc, stat) => ({ ...acc, [stat.id]: stat }),
      {}
    )

    const player = teamPlayers[playerId]
    const _username = data.username.toLowerCase()
    const playerData = { ...player, ...data, _username, stats, uid: playerId }

    const players = { ...teamPlayers, [playerId]: playerData }
    const participant = { ...team, players, playerIds }

    setParticipant(teamId, participant)
    bSave({ [`participants.${teamId}`]: participant })
    setLoading(false)
    afterSubmit?.()
  }, console.error)

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

  const onDelete = () => {
    const participantData = { ...participants[teamId] }
    const playerIds = participantData.playerIds
    const { [playerId]: deletedPlayer, ...players } = participantData.players
    participantData.players = players
    participantData.playerIds = playerIds.filter((id) => id !== playerId)
    setParticipant(teamId, participantData)
    bSave({ [`participants.${teamId}`]: participantData })
    afterSubmit?.()
  }

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
        <Group spacing="sm">
          <PlayerFormPhotoAdj control={control} setValue={setValue} />
          <PlayerFormStat control={control} />
        </Group>

        <Group position="apart" style={{ marginTop: 15 }}>
          {isEdit ? (
            <Confirm onConfirm={onDelete}>
              <Button
                variant="subtle"
                size="xs"
                color="red"
                leftIcon={<Trash size={18} />}
              >
                Delete
              </Button>
            </Confirm>
          ) : (
            <Button variant="subtle" size="xs" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button
            ref={saveRef}
            type="submit"
            size="xs"
            leftIcon={<DeviceFloppy size={18} />}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
export default PlayerForm
