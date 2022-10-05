import { AspectRatio, Box, CloseButton, TextInput } from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { showNotification } from "@mantine/notifications"
import { getDownloadURL, ref } from "firebase/storage"
import { FilePreview } from "interface"
import { useState } from "react"
import { useUploadFile } from "react-firebase-hooks/storage"
import { Control, FieldArrayWithId, UseFormSetValue } from "react-hook-form"
import { storage } from "utils/firebase/firebase.instance"
import { VetoSettings } from "utils/schema/veto.schema"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import { DropzoneContent } from "../DropzoneContent.ui"

interface Props {
  control: Control<VetoSettings>
  setValue: UseFormSetValue<VetoSettings>
  field: FieldArrayWithId<VetoSettings, "mapPool", "id">
  remove: (index: number) => void
  index: number
}
const MatchVetoMapPoolItemForm = ({
  control,
  remove,
  field,
  index,
  setValue,
}: Props) => {
  const [uploadFile, uploading] = useUploadFile()
  const room = useActiveRoom()
  const { auth } = useAuth()
  const [preview, setPreview] = useState<FilePreview>(new FilePreview())

  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return

    setPreview(new FilePreview(file))
    if (!auth || !room) return

    const uploadPath = `public/user/${auth.uid}/mapPool/${field.id}`
    const uploadRef = ref(storage, uploadPath)
    uploadFile(uploadRef, file).then(
      async () => {
        return getDownloadURL(uploadRef).then((url) => {
          setValue(`mapPool.${index}.imageUrl`, url)
        })
      },
      (err) => {
        console.log({ err })
        showNotification({ message: err.message, title: "Error", color: "red" })
      }
    )
  }

  return (
    <Box sx={{ position: "relative" }}>
      <CloseButton
        sx={{ position: "absolute", top: 3, right: 3, zIndex: 999 }}
        onClick={() => remove(index)}
      />
      <AspectRatio ratio={16 / 9} sx={{ width: "100%" }}>
        <Dropzone
          multiple={false}
          onDrop={onDrop}
          accept={IMAGE_MIME_TYPE}
          loading={uploading}
        >
          <DropzoneContent
            withText={false}
            preview={[preview.path || field.imageUrl || ""]}
          />
        </Dropzone>
      </AspectRatio>
      <TextInput {...control.register(`mapPool.${index}.name`)} />
    </Box>
  )
}

export default MatchVetoMapPoolItemForm
