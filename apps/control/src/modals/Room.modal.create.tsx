import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
  Text,
} from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { DocumentReference } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview } from "interface"
import { MouseEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { setRoom } from "utils/firebase/room.queries"
import { RoomModel } from "utils/models/Room.model"
import { RoomCreateSchema, roomCreateSchema } from "utils/schema/room.schema"
import { DropzoneContent } from "../comps/DropzoneContent.component"
import { useAuth } from "../context/auth/Auth.hooks"

interface RoomCreateModalProps extends ModalProps {}

const RoomCreateModal = (props: RoomCreateModalProps) => {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<FilePreview>(
    new FilePreview()
  )
  const { register, setValue, getFieldState, handleSubmit } =
    useForm<RoomCreateSchema>({
      defaultValues: { avatar: "", name: "" },
      resolver: zodResolver(roomCreateSchema),
    })

  const save = (roomRef: DocumentReference<RoomModel>) =>
    handleSubmit(async (data) => {
      if (!auth) return
      setLoading(true)
      setRoom(roomRef.id, {
        admins: [],
        avatar: data.avatar,
        id: roomRef.id,
        name: data.name,
        owner: auth.uid || "",
      })
      props.onClose()
    }, console.error)

  const uploadAndSet: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!auth) return

    const roomRef = RoomModel.create()
    const saveFn = save(roomRef)
    if (!avatarPreview.file) return saveFn(e)

    setUploading(true)
    const uploadPath = `public/user/${auth.uid}/room/${roomRef.id}/avatar`
    const uploadRef = ref(storage, uploadPath)
    const snap = await uploadBytes(uploadRef, avatarPreview.file)
    const downloadUrl = await getDownloadURL(snap.ref)
    setValue("avatar", downloadUrl)
    setUploading(false)
    saveFn(e)
  }

  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return
    setAvatarPreview(new FilePreview(file))
  }

  return (
    <Modal {...props} centered title="Create Room">
      <Stack>
        <TextInput
          label="Room Name"
          {...register("name")}
          error={getFieldState("name").error?.message}
        />

        <Stack spacing={4}>
          <Text size="sm">Image</Text>
          <Dropzone
            multiple={false}
            onDrop={onDrop}
            accept={IMAGE_MIME_TYPE}
            loading={uploading}
          >
            {(status) => (
              <DropzoneContent status={status} preview={[avatarPreview.path]} />
            )}
          </Dropzone>
        </Stack>

        <Group position="right">
          <Button onClick={uploadAndSet}>Create</Button>
        </Group>
      </Stack>
    </Modal>
  )
}
export default RoomCreateModal
