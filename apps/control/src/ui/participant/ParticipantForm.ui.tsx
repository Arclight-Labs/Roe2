import { zodResolver } from "@hookform/resolvers/zod"
import {
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
  Text,
  Space,
  Button,
} from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { nanoid } from "@reduxjs/toolkit"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview } from "interface"
import { SanitizedParticipant } from "interface/waypoint"
import { FormEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { useParticipants } from "utils/hooks"
import {
  participantSchema,
  ParticipantSchema,
} from "utils/schema/participant.schema"
import { setParticipant } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useRoom } from "../../context/room/Room.hooks"
import { DropzoneContent } from "../DropzoneContent.ui"
import { defaultParticipant } from "utils/general"
import { useBSave } from "../../context/bsave/bsave.hook"

type Props = keyof ParticipantSchema

export type ParticipantProps = Pick<SanitizedParticipant, Props> & {
  teamId?: string
}
export interface ParticipantFormProps {
  participant?: ParticipantProps
  onCancel?: VoidFunction
  afterSubmit?: VoidFunction
}

const ParticipantForm = ({
  participant,
  onCancel,
  afterSubmit,
}: ParticipantFormProps) => {
  const bSave = useBSave()
  const room = useRoom()
  const { auth } = useAuth()
  const { participants } = useParticipants()
  const [photo, setPhoto] = useState<FilePreview>(new FilePreview())
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, setValue } = useForm<ParticipantSchema>({
    defaultValues: {
      name: participant?.name ?? "",
      logo: participant?.logo ?? "",
      shortname: participant?.shortname ?? "",
      shortcode: participant?.shortcode ?? "",
      schoolShortcode: participant?.schoolShortcode ?? "",
      school: participant?.school ?? "",
    },
    resolver: zodResolver(participantSchema),
  })

  const teamId = participant?.teamId || nanoid()

  const saveFn = handleSubmit(async (data) => {
    const participantData: SanitizedParticipant = {
      ...(participants[teamId] ?? defaultParticipant),
      teamId,
      chalId:
        participants[teamId].chalId ||
        Math.floor(Math.random() * 599999999999) + 300000000,
      ...data,
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
    const uploadPath = `public/user/${auth.uid}/room/${room?.id}/teams/${teamId}`
    const uploadRef = ref(storage, uploadPath)
    const snap = await uploadBytes(uploadRef, photo.file)
    const downloadUrl = await getDownloadURL(snap.ref)
    setValue("logo", downloadUrl)
    saveFn(e)
  }

  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return
    setPhoto(new FilePreview(file))
  }

  return (
    <form onSubmit={uploadAndSet}>
      <Stack spacing="lg">
        <LoadingOverlay visible={loading} />
        <Stack>
          <TextInput label="Team Name" {...register("name")} required />
          <Group>
            <TextInput
              sx={{ flex: 1 }}
              label="Shortname"
              {...register("shortname")}
            />
            <TextInput
              sx={{ flex: 1 }}
              label="Shortcode"
              {...register("shortcode")}
            />
          </Group>
        </Stack>
        <Divider variant="dashed" />
        <Stack>
          <TextInput label="School" {...register("school")} />
          <Group>
            <TextInput
              sx={{ flex: 1 }}
              label="School Shortcode"
              {...register("schoolShortcode")}
            />
            <Space sx={{ flex: 1 }} />
          </Group>
        </Stack>
        <Divider variant="dashed" />
        <Stack spacing="sm">
          <Text>Logo</Text>
          <Dropzone multiple={false} onDrop={onDrop} accept={IMAGE_MIME_TYPE}>
            {(status) => (
              <DropzoneContent
                status={status}
                preview={[photo.path || participant?.logo || ""]}
              />
            )}
          </Dropzone>
        </Stack>
        <Group position="apart">
          <Button size="xs" variant={"subtle"} onClick={onCancel}></Button>
          <Button size="xs" type="submit">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
export default ParticipantForm
