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
import { FilePreview, Room } from "interface"
import { MouseEventHandler, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { setRoom } from "utils/firebase/room.queries"
import { RoomModel } from "utils/models/Room.model"
import { RoomCreateSchema, roomCreateSchema } from "utils/schema/room.schema"
import { DropzoneContent } from "../comps/DropzoneContent.component"
import UserSelect from "../comps/user/UserMultiInput.component"
import { useAuth } from "../context/auth/Auth.hooks"
import { useActiveRoom } from "../hooks/useActiveRoom.hook"

interface RoomCreateModalProps extends ModalProps {
  data?: RoomModel
}

const RoomModal = ({ data, ...props }: RoomCreateModalProps) => {
  const { auth } = useAuth()
  const [activeRoom, setActiveRoom] = useActiveRoom()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<FilePreview>(
    new FilePreview()
  )
  const { register, setValue, getFieldState, handleSubmit, watch, reset } =
    useForm<RoomCreateSchema>({
      defaultValues: {
        avatar: data?.avatar || "",
        name: data?.name || "",
        admins: data?.admins || [],
      },
      resolver: zodResolver(roomCreateSchema),
    })

  useEffect(() => {
    reset(data)
  }, [data])

  const save = (roomRef: DocumentReference<RoomModel>) =>
    handleSubmit(async (data) => {
      if (!auth) return
      setLoading(true)
      const newData = {
        admins: data.admins,
        avatar: data.avatar,
        id: roomRef.id,
        name: data.name,
        owner: auth.uid || "",
      }
      setRoom(roomRef.id, newData, { merge: true })
      if (activeRoom?.id === roomRef.id) {
        setActiveRoom((s) => new RoomModel({ ...s?.toJSON(), ...newData }))
      }
      props.onClose()
    }, console.error)

  const uploadAndSet: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!auth) return

    const roomRef = data ? data.ref() : RoomModel.create()
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

  const onChangeAdmins = (uids: string[]) => {
    setValue("admins", uids)
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
              <DropzoneContent
                status={status}
                preview={[avatarPreview.path || data?.avatar || ""]}
              />
            )}
          </Dropzone>
        </Stack>

        <UserSelect onSelect={onChangeAdmins} selected={watch("admins")} />

        <Group position="right">
          <Button onClick={uploadAndSet}>{data ? "Save" : "Create"}</Button>
        </Group>
      </Stack>
    </Modal>
  )
}
export default RoomModal
