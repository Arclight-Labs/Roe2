import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
  Text,
  LoadingOverlay,
  Code,
} from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { useClipboard } from "@mantine/hooks"
import { DocumentReference, getDocs, writeBatch } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview } from "interface"
import { MouseEventHandler, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { db, storage } from "utils/firebase"
import {
  getBroadcastData,
  getBroadcastRef,
  getRoomColRefByUniqueCode,
} from "utils/firebase/room.queries"
import { defaultBroadcast } from "utils/general"
import { RoomModel } from "utils/models/Room.model"
import { RoomCreateSchema, roomCreateSchema } from "utils/schema/room.schema"
import { useWsAction } from "utils/socket"
import { useAuth } from "../context/auth/Auth.hooks"
import { useActiveRoom } from "../hooks/useActiveRoom.hook"
import { DropzoneContent } from "../ui/DropzoneContent.ui"
import UserSelect from "../ui/user/UserMultiInput.ui"

interface RoomCreateModalProps extends ModalProps {
  data?: RoomModel
}

const RoomModal = ({ data: room, ...props }: RoomCreateModalProps) => {
  const { copy } = useClipboard()
  const { auth } = useAuth()
  const { setRoom } = useWsAction()
  const [activeRoom, setActiveRoom] = useActiveRoom()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<FilePreview>(
    new FilePreview()
  )
  const {
    register,
    setValue,
    getFieldState,
    handleSubmit,
    watch,
    reset,
    setError,
  } = useForm<RoomCreateSchema>({
    defaultValues: {
      avatar: room?.avatar || "",
      name: room?.name || "",
      admins: room?.admins || [],
      uniqueCode: room?.uniqueCode || "",
    },
    resolver: zodResolver(roomCreateSchema),
  })

  useEffect(() => {
    reset(room)
  }, [room])

  const save = (roomRef: DocumentReference<RoomModel>) =>
    handleSubmit(async (data) => {
      if (!auth) return
      setLoading(true)

      // check if uniqueCode is unique
      const uniqueCode = data.uniqueCode
      if (uniqueCode && uniqueCode !== room?.uniqueCode) {
        const refColSnap = await getDocs(getRoomColRefByUniqueCode(uniqueCode))
        const [doc] = refColSnap.docs ?? []
        if (!!doc && doc.id !== roomRef.id) {
          setError("uniqueCode", { message: "Room unique code already taken" })
          setLoading(false)
          return
        }
      }

      const newData = {
        admins: data.admins,
        avatar: data.avatar,
        id: roomRef.id,
        name: data.name,
        owner: room?.owner || auth.uid || "",
        uniqueCode: data.uniqueCode || "",
      }
      const batch = writeBatch(db)

      const broadcastData = await getBroadcastData(roomRef.id)
      const broadcastRef = getBroadcastRef(roomRef.id)
      const defaultBroadcastData = { ...defaultBroadcast, roomId: roomRef.id }
      batch.set(roomRef, newData, { merge: true })
      if (!broadcastData) {
        batch.set(broadcastRef, defaultBroadcastData)
      }

      await batch.commit()
      setLoading(false)

      if (!data) {
        const liveData = broadcastData ?? defaultBroadcastData
        setRoom({ ...newData, ...liveData, listeners: {} })
      }

      if (activeRoom?.id === roomRef.id) {
        setActiveRoom((s) => new RoomModel({ ...s?.toJSON(), ...newData }))
      }
      props.onClose()
    }, console.error)

  const uploadAndSet: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!auth) return

    const roomRef = room ? room.ref() : RoomModel.create()
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
      <LoadingOverlay visible={loading} />
      <Stack>
        {room?.id && <Code onClick={() => copy(room.id)}>{room.id}</Code>}
        <TextInput
          label="Room Name"
          {...register("name")}
          error={getFieldState("name").error?.message}
        />
        <TextInput
          label="Room Unique Code"
          {...register("uniqueCode")}
          error={getFieldState("uniqueCode").error?.message}
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
                preview={[avatarPreview.path || room?.avatar || ""]}
              />
            )}
          </Dropzone>
        </Stack>

        <UserSelect onSelect={onChangeAdmins} selected={watch("admins")} />

        <Group position="right">
          <Button onClick={uploadAndSet}>{room ? "Save" : "Create"}</Button>
        </Group>
      </Stack>
    </Modal>
  )
}
export default RoomModal
