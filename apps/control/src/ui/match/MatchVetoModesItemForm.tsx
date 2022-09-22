import {
  AspectRatio,
  Box,
  Button,
  Card,
  CloseButton,
  Group,
  List,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core"
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { showNotification } from "@mantine/notifications"
import { getDownloadURL, ref } from "firebase/storage"
import { FilePreview } from "interface"
import { useState } from "react"
import { useUploadFile } from "react-firebase-hooks/storage"
import { Control, FieldArrayWithId, UseFormSetValue } from "react-hook-form"
import { Check } from "tabler-icons-react"
import { storage } from "utils/firebase/firebase.instance"
import { defaultVetoMode } from "utils/general/defaultValues"
import { VetoMap, VetoMode, VetoSettings } from "utils/schema/veto.schema"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import { DropzoneContent } from "../DropzoneContent.ui"
import MatchVetoModesItemMapPoolForm from "./MatchVetoModesItemMapPoolForm"

interface Props {
  control: Control<VetoSettings>
  setValue: UseFormSetValue<VetoSettings>
  field: FieldArrayWithId<VetoSettings, "modes", "id">
  remove: (index: number) => void
  index: number
  mapPool: VetoMap[]
  mode: VetoMode
}
const MatchVetoModesItemForm = ({
  control,
  remove,
  field,
  index,
  mode = defaultVetoMode,
  mapPool,
  setValue,
}: Props) => {
  const [opened, setOpened] = useState(false)
  const [uploadFile, uploading] = useUploadFile()
  const room = useActiveRoom()
  const { auth } = useAuth()
  const [preview, setPreview] = useState<FilePreview>(new FilePreview())

  const onDrop: DropzoneProps["onDrop"] = (files) => {
    const file = files[0]
    if (!file) return

    setPreview(new FilePreview(file))
    if (!auth || !room) return

    const uploadPath = `public/user/${auth.uid}/modes/${field.id}`
    const uploadRef = ref(storage, uploadPath)
    uploadFile(uploadRef, file).then(
      (res) => {
        if (!res) return
        return getDownloadURL(res.ref).then((url) => {
          setValue(`modes.${index}.imageUrl`, url)
        })
      },
      (err) => {
        showNotification({ message: err.message, title: "Error", color: "red" })
      }
    )
  }

  const selectedMap: VetoMap[] = mode.mapPool
    .map((id) => mapPool.find((map) => map.id === id) as VetoMap)
    .filter(Boolean)

  return (
    <Card withBorder sx={{ width: "100%", position: "relative" }}>
      <CloseButton
        sx={{ position: "absolute", top: 3, right: 3, zIndex: 999 }}
        onClick={() => remove(index)}
      />
      <Group align="flex-start">
        <Stack>
          <Text size="sm">Mode</Text>
          <Box>
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
            <TextInput {...control.register(`modes.${index}.name`)} />
          </Box>
        </Stack>
        <Stack>
          <Group spacing="xs">
            <Text size="sm">Map Pool</Text>
            <Button onClick={() => setOpened(true)} variant="light" size="xs">
              Select from Map Pool
            </Button>
          </Group>
          <List
            spacing="xs"
            size="xs"
            center
            icon={
              <ThemeIcon size="xs" variant="light" radius="xl">
                <Check size={12} />
              </ThemeIcon>
            }
          >
            {selectedMap.map((map) => (
              <List.Item key={map.id}>{map.name}</List.Item>
            ))}
          </List>
        </Stack>
      </Group>
      <MatchVetoModesItemMapPoolForm
        setValue={setValue}
        mapPool={mapPool}
        opened={opened}
        mode={mode}
        onClose={() => setOpened(false)}
        modeIndex={index}
        control={control}
      />
    </Card>
  )
}

export default MatchVetoModesItemForm
