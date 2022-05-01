import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { showNotification } from "@mantine/notifications"
import { User as FireUser } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview, User } from "interface"
import { MouseEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { userColRef } from "utils/firebase/user.queries"
import { UserUpdate, userUpdateSchema } from "utils/schema/user.schema"
import { DropzoneContent } from "../comps/DropzoneContent"

interface Props extends ModalProps {
  user: FireUser
  data?: User
}

const UserModal = ({ user, data, ...props }: Props) => {
  const { register, handleSubmit, setValue } = useForm<UserUpdate>({
    defaultValues: { avatar: "", ...data },
    resolver: zodResolver(userUpdateSchema),
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<FilePreview>(
    new FilePreview()
  )

  const save = handleSubmit(async (data) => {
    setLoading(true)
    const docRef = doc(userColRef)
    await setDoc(docRef, {
      uid: user.uid,
      username: data.username,
      _username: data.username.toLowerCase(),
      avatar: data.avatar,
      email: user.email,
      socialHandle: data.socialHandle,
    })
    setLoading(false)
  }, console.error)

  const uploadAndSet: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!avatarPreview.file) return save(e)
    setUploading(true)
    const uploadRef = ref(storage, `${user.uid}/avatar/${Date.now()}`)
    const snap = await uploadBytes(uploadRef, avatarPreview.file)
    const downloadUrl = await getDownloadURL(snap.ref)
    setValue("avatar", downloadUrl)
    setUploading(false)
    save(e)
  }

  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return
    setAvatarPreview(new FilePreview(file))
  }

  return (
    <Modal {...props} title="Update User Info">
      <LoadingOverlay visible={loading} />
      <Stack>
        <TextInput
          label="Username"
          placeholder="xXxSlayerxXx"
          {...register("username")}
          autoFocus
        />
        <TextInput
          label="Social Handle"
          placeholder="@yourMom"
          {...register("socialHandle")}
        />
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
        <Group position="right">
          <Button onClick={uploadAndSet} disabled={loading}>
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
export default UserModal
