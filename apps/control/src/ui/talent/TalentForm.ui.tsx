import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Stack, Text, TextInput } from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { nanoid } from "@reduxjs/toolkit"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FilePreview, User } from "interface"
import { Live } from "interface/ws"
import { FC, FormEventHandler, useState } from "react"
import { useForm } from "react-hook-form"
import { At, Trash } from "tabler-icons-react"
import { storage } from "utils/firebase"
import { useLive } from "utils/hooks"
import { UserUpdate, userUpdateSchema } from "utils/schema/user.schema"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { DropzoneContent } from "../DropzoneContent.ui"
import Confirm from "../popups/Confirm.ui"

interface TalentModalProps {
  data: User
  onCancel?: VoidFunction
  afterSubmit?: VoidFunction
}
const TalentForm: FC<TalentModalProps> = ({ data, onCancel, afterSubmit }) => {
  const { live } = useLive()
  const { accessToken } = useAuth()
  const { register, handleSubmit, setValue, getFieldState } =
    useForm<UserUpdate>({
      defaultValues: {
        avatar: data.avatar || "",
        isTalent: true,
        username: data.username || "",
        socialHandle: data.socialHandle || "",
      },
      resolver: zodResolver(userUpdateSchema),
    })

  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<FilePreview>(
    new FilePreview()
  )

  const isEdit = !!data.uid
  const uid = data.uid || nanoid()
  const { [uid]: addedActiveTalent, ...activeTalents } = live.activeTalents

  const save = handleSubmit(async (inputData) => {
    const newTalent: User = {
      ...data,
      ...inputData,
      uid,
    }

    const saveData: Partial<Live> = {
      talents: { ...live.talents, [uid]: newTalent },
    }

    const saveActiveData: Partial<Live> = {
      activeTalents: { ...activeTalents, [uid]: newTalent },
    }

    setLive(accessToken)(saveData)
    afterSubmit?.()
    if (uid === addedActiveTalent.uid) {
      setLive(accessToken)(saveActiveData)
    }
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

  const onDelete = () => {
    const talents = { ...live.talents }
    const activeTalents = { ...live.activeTalents }
    delete talents[uid]
    delete activeTalents[uid]
    const saveData: Partial<Live> = { talents, activeTalents }
    setLive(accessToken)(saveData)
    afterSubmit?.()
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
            <DropzoneContent
              preview={[avatarPreview.path || data?.avatar || ""]}
            />
          </Dropzone>
        </Stack>

        <Group position="apart">
          {isEdit ? (
            <Confirm onConfirm={onDelete} ButtonProps={{ color: "red" }}>
              <Button
                variant="light"
                size="sm"
                color="red"
                leftIcon={<Trash size={18} />}
              >
                Delete
              </Button>
            </Confirm>
          ) : (
            <Button variant="light" onClick={onCancel} size="sm">
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={uploading} size="sm">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
export default TalentForm
