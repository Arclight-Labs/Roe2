import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { User as FireUser } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview } from "interface"
import { MouseEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { At } from "tabler-icons-react"
import { storage } from "utils/firebase"
import { getUserByUsername, setUser } from "utils/firebase/user.queries"
import { UserModel } from "utils/models/User.model"
import { UserUpdate, userUpdateSchema } from "utils/schema/user.schema"
import { DropzoneContent } from "../ui/DropzoneContent.ui"

interface Props extends ModalProps {
  user: FireUser
  data?: UserModel | null
}

const UserModal = ({ user, data, ...props }: Props) => {
  const { register, handleSubmit, setValue, getFieldState, setError } =
    useForm<UserUpdate>({
      defaultValues: {
        avatar: data?.avatar || "",
        isTalent: data?.type === "talent",
        username: data?.username || "",
        socialHandle: data?.socialHandle || "",
      },
      resolver: zodResolver(userUpdateSchema),
    })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<FilePreview>(
    new FilePreview()
  )

  const save = handleSubmit(async (data) => {
    setLoading(true)
    const userCheck = await getUserByUsername(data.username)
    if (userCheck && userCheck.id !== user.uid) {
      setLoading(false)
      return setError("username", { message: "Username already taken" })
    }
    await setUser(
      user.uid,
      {
        uid: user.uid,
        username: data.username,
        _username: data.username.toLowerCase(),
        avatar: data.avatar,
        email: user.email || "",
        socialHandle: data.socialHandle,
        type: data.isTalent ? "talent" : "default",
      },
      { merge: true }
    )
    setLoading(false)
    props.onClose()
  }, console.error)

  const uploadAndSet: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!avatarPreview.file) return save(e)
    setUploading(true)
    const uploadRef = ref(storage, `public/user/${user.uid}/avatar`)
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
    <Modal {...props} centered title="Update User Info">
      <LoadingOverlay visible={loading} />
      <Stack>
        <TextInput
          label="Username / Alias"
          placeholder="xXxSlayerxXx"
          {...register("username")}
          error={getFieldState("username").error?.message}
          autoFocus
          required
        />
        <TextInput
          label="Social Handle"
          placeholder="gitGud69"
          icon={<At size={14} />}
          required
          error={getFieldState("socialHandle").error?.message}
          {...register("socialHandle")}
        />
        <Stack spacing={4}>
          <Text size="sm">Avatar</Text>
          <Dropzone
            multiple={false}
            onDrop={onDrop}
            accept={IMAGE_MIME_TYPE}
            loading={uploading}
          >
            <DropzoneContent
              preview={[avatarPreview.path || data?.avatar || ""]}
            />
          </Dropzone>
        </Stack>
        <Switch
          label="I am a talent / caster / host / guest"
          {...register("isTalent")}
        />
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
