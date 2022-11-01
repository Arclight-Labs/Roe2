import { uuidv4 } from "@firebase/util"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import { Dropzone, DropzoneProps } from "@mantine/dropzone"
import { showNotification } from "@mantine/notifications"
import { doc, DocumentReference, setDoc } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import { FilePreview, Rundown } from "interface/db"
import { useState } from "react"
import { useUploadFile } from "react-firebase-hooks/storage"
import { useForm } from "react-hook-form"
import { db, storage } from "utils/firebase"
import { defaultRundown } from "utils/general/defaultValues"
import { RundownSchema, rundownSchema } from "utils/schema/rundown.schema"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useRoom } from "../../context/room/Room.hooks"
import { DropzoneContent } from "../../ui/DropzoneContent.ui"

interface Props extends ModalProps {
  rundown?: Rundown
}
const RundownModalForm = ({ rundown = defaultRundown, ...props }: Props) => {
  const { auth } = useAuth()
  const room = useRoom()
  const [loading, setLoading] = useState(false)
  const [uploadFile, uploading] = useUploadFile()
  const [preview, setPreview] = useState<FilePreview>(new FilePreview())
  const { register, watch, handleSubmit, setValue } = useForm<RundownSchema>({
    defaultValues: {
      name: rundown.name,
      desc: rundown.desc,
      image: rundown.image,
    },
    resolver: zodResolver(rundownSchema),
  })

  const image = watch("image")
  const isEdit = !!rundown
  const title = isEdit ? "Edit Rundown" : "Create Rundown"

  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return

    setPreview(new FilePreview(file))
    if (!auth || !room) return

    const uploadPath = `public/user/${auth.uid}/rundowns/${uuidv4()}`
    const uploadRef = ref(storage, uploadPath)
    uploadFile(uploadRef, file).then(
      (res) => {
        if (!res) return
        return getDownloadURL(res.ref).then((url) => {
          setValue("image", url)
        })
      },
      (err) => {
        showNotification({ message: err.message, title: "Error", color: "red" })
      }
    )
  }

  const save = handleSubmit(async (data) => {
    if (!room) {
      return showNotification({ message: "No room found", color: "red" })
    }

    const path = `rundowns/${rundown?.id || uuidv4()}`
    setLoading(true)
    const ref = doc(db, path) as DocumentReference<Rundown>
    const payload: Rundown = {
      ...rundown,
      ...data,
      roomId: room.id,
      id: ref.id,
    }
    try {
      await setDoc(ref, payload, { merge: true })
      props.onClose()
    } catch (e) {
      showNotification({ message: "Error saving rundown", color: "red" })
      console.error(e)
    }
    setLoading(false)
  }, console.error)

  return (
    <Modal {...props} title={title}>
      <LoadingOverlay visible={loading} />
      <Stack>
        <TextInput label="Name" {...register("name")} />
        <Textarea minRows={3} label="Description" {...register("desc")} />
        <Stack spacing={5}>
          <LoadingOverlay visible={uploading} />
          <Text size="sm">Image</Text>
          <Dropzone onDrop={onDrop}>
            <DropzoneContent preview={[preview.path, image]}></DropzoneContent>
          </Dropzone>
        </Stack>

        <Group position="right">
          <Button variant="light" size="xs" onClick={props.onClose}>
            Cancel
          </Button>
          <Button size="xs" onClick={save}>
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}

export default RundownModalForm
