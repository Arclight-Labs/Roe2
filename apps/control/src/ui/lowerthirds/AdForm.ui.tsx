import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Group, LoadingOverlay, Stack } from "@mantine/core"
import { nanoid } from "@reduxjs/toolkit"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { FilePreview } from "interface"
import {
  Ad,
  AdPool,
  AdWithPriority,
  Live,
  Lowerthird,
  LowerthirdData,
} from "interface/ws/Live.interface"
import { FC, FormEventHandler, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { storage } from "utils/firebase"
import { useLt } from "utils/hooks"
import { RoomModel } from "utils/models/Room.model"
import { AdSchema, adSchema } from "utils/schema/lowerthird.schema"
import { setLive } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useBSave } from "../../context/bsave/bsave.hook"
import { useRoom } from "../../context/room/Room.hooks"
import AdjImageDropzone from "../adj/AdjImageDropzone.ui"
import AdjTextarea from "../adj/AdjTextArea.ui"
import AdjTextInput from "../adj/AdjTextInput.ui"
import Confirm from "../popups/Confirm.ui"

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
  const handlers = useForm<AdSchema>({
    defaultValues: ad,
    resolver: zodResolver(adSchema),
  })
  const isEdit = !!id
  const adId = id || nanoid(6)
  const { handleSubmit, setValue } = handlers

  const save = (saveData?: boolean) =>
    handleSubmit((data) => {
      const newAd: AdWithPriority = {
        ...data,
        id: adId,
      }
      const currentAds = lt.data.adPool.ads
      const newAdPoolAds = !isEdit
        ? [...currentAds, newAd]
        : currentAds.map((adItem) => {
            return id === adItem.id ? { ...adItem, ...data } : adItem
          })

      const newAdPool: AdPool = { ...lt.data.adPool, ads: newAdPoolAds }
      const newLtData: LowerthirdData = { ...lt.data, adPool: newAdPool }
      const newLt: Lowerthird = { ...lt, data: newLtData }
      const newData: Partial<Live> = { lt: newLt }
      setLive(newData)
      if (saveData) {
        bSave(newData)
        afterSubmit?.()
      }
    }, console.error)

  const uploadAndSubmit =
    (saveData?: boolean): FormEventHandler =>
    async (e) => {
      e.preventDefault()
      if (!auth) return

      const roomRef = room ? room.ref() : RoomModel.create()
      if (!preview.file) return save(saveData)(e)

      setUploading(true)
      const uploadPath = `public/user/${auth.uid}/room/${roomRef.id}/avatar`
      const uploadRef = ref(storage, uploadPath)
      const snap = await uploadBytes(uploadRef, preview.file)
      const downloadUrl = await getDownloadURL(snap.ref)
      setValue("image.URL", downloadUrl)
      setUploading(false)
      save(saveData)(e)
    }

  const onDelete = () => {
    const newAdPoolAds = lt.data.adPool.ads.filter(
      (adItem) => adItem.id !== adId
    )
    const newAdPool = { ...lt.data.adPool, ads: newAdPoolAds }
    const newLtData = { ...lt.data, adPool: newAdPool }
    const newLt = { ...lt, data: newLtData }
    const newData = { lt: newLt }
    setLive(newData)
    bSave(newData)
    afterSubmit?.()
  }

  return (
    <FormProvider {...handlers}>
      <form onSubmit={uploadAndSubmit(true)}>
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
          <Group noWrap position="right">
            {isEdit && (
              <Confirm onConfirm={onDelete}>
                <Button size="xs" color="red">
                  Delete
                </Button>
              </Confirm>
            )}
            <Button size="xs" variant="light" onClick={uploadAndSubmit()}>
              Apply
            </Button>
            <Button size="xs" type="submit">
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default AdForm
