import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, LoadingOverlay, Stack } from "@mantine/core"
import { nanoid } from "@reduxjs/toolkit"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { FilePreview } from "interface"
import { Ad } from "interface/ws/Live.interface"
import { FC, FormEventHandler, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { useLt } from "utils/hooks"
import { RoomModel } from "utils/models/Room.model"
import { adSchema } from "utils/schema/lowerthird.schema"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useBSave } from "../../context/bsave/bsave.hook"
import { useRoom } from "../../context/room/Room.hooks"
import AdjImageDropzone from "../adj/AdjImageDropzone.ui"
import AdjTextarea from "../adj/AdjTextArea.ui"
import AdjTextInput from "../adj/AdjTextInput.ui"

interface AdFormProps {
  ad: Ad
  onCancel?: VoidFunction
  afterSubmit?: VoidFunction
}
const AdForm: FC<AdFormProps> = ({ ad: { id, ...ad }, afterSubmit }) => {
  const { auth } = useAuth()
  const room = useRoom()
  const { lt } = useLt()
  const bSave = useBSave()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<FilePreview>(new FilePreview())
  const handlers = useForm({
    defaultValues: ad,
    resolver: zodResolver(adSchema),
  })
  const adId = id || nanoid(6)
  const { handleSubmit, setValue } = handlers

  const save = handleSubmit((data) => {
    const newAdPoolAds = {
      ...lt.data.adPool.ads,
      [adId]: { ...data, id: adId },
    }
    const newAdPool = { ...lt.data.adPool, ads: newAdPoolAds }
    const newLtData = { ...lt.data, adPool: newAdPool }
    const newLt = { ...lt, data: newLtData }
    const saveData = { lt: newLt }
    setLive(saveData)
    bSave(saveData)
    afterSubmit?.()
  }, console.error)

  const uploadAndSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    if (!auth) return

    const roomRef = room ? room.ref() : RoomModel.create()
    if (!preview.file) return save(e)

    setUploading(true)
    const uploadPath = `public/user/${auth.uid}/room/${roomRef.id}/avatar`
    const uploadRef = ref(storage, uploadPath)
    const snap = await uploadBytes(uploadRef, preview.file)
    const downloadUrl = await getDownloadURL(snap.ref)
    setValue("image.URL", downloadUrl)
    setUploading(false)
    save(e)
  }

  return (
    <FormProvider {...handlers}>
      <form onSubmit={uploadAndSubmit}>
        <LoadingOverlay visible={uploading} />
        <Stack spacing="lg">
          <AdjImageDropzone
            preview={ad.image.URL}
            file={preview}
            setFile={setPreview}
            name="image"
          />
          <Divider />
          <AdjTextInput name="headline" label="Headline" />
          <AdjTextarea name="body" label="Body" />
          <Button size="xs" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default AdForm
