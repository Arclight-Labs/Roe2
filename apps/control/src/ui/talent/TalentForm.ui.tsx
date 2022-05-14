import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { FilePreview } from "interface"
import { useState, FC, FormEventHandler } from "react"
import { useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { getUserByUsername } from "utils/firebase/user.queries"
import { UserUpdate, userUpdateSchema } from "utils/schema/user.schema"
import { User } from "interface"
import { nanoid } from "@reduxjs/toolkit"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextInput, Group, Text, Button, Stack } from "@mantine/core"
import { At } from "tabler-icons-react"
import { DropzoneContent } from "../DropzoneContent.ui"
import { setLive } from "utils/socket/events"
import { useLive } from "utils/hooks"
import { useRoom } from "../../context/room/Room.hooks"
import { Live } from "interface/ws"
import { useBSave } from "../../context/bsave/bsave.hook"

interface TalentModalProps {
  data: User
  onCancel?: VoidFunction
  afterSubmit?: VoidFunction
}
const TalentForm: FC<TalentModalProps> = ({ data, onCancel, afterSubmit }) => {
  const bSave = useBSave()
  const room = useRoom()
  const live = useLive()
  const { register, handleSubmit, setValue, getFieldState, setError } =
    useForm<UserUpdate>({
      defaultValues: {
        avatar: data.avatar || "",
        isTalent: true,
        username: data.username || "",
        socialHandle: data.socialHandle || "",
      },
      resolver: zodResolver(userUpdateSchema),
    })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<FilePreview>(
    new FilePreview()
  )

  const uid = data.uid || nanoid()

  const save = handleSubmit(async (inputData) => {
    const newTalent: User = {
      ...data,
      ...inputData,
    }
    const saveData: Partial<Live> = {
      talents: { ...live.talents, [uid]: newTalent },
    }
    setLive(saveData)
    bSave(saveData)
    afterSubmit?.()
  }, console.error)

  const uploadAndSet: FormEventHandler = async (e) => {
    e.preventDefault()
    if (!avatarPreview.file) return save(e)
    setUploading(true)
    const uploadRef = ref(storage, `public/user/${uid}/avatar`)
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
    <form onSubmit={uploadAndSet}>
      <Stack>
        <TextInput
          label="Alias"
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
            {(status) => (
              <DropzoneContent
                status={status}
                preview={[avatarPreview.path || data?.avatar || ""]}
              />
            )}
          </Dropzone>
        </Stack>

        <Group position="apart">
          <Button variant="light" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
export default TalentForm
