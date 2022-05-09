import {
  MantineTheme,
  Group,
  Text,
  useMantineTheme,
  Image,
} from "@mantine/core"
import { DropzoneStatus } from "@mantine/dropzone"
import { Icon as TablerIcon, Photo, Upload, X } from "tabler-icons-react"
import { ComponentProps } from "react"

interface Props {
  status: DropzoneStatus
  preview: string[]
  minHeight?: number
}
export const DropzoneContent = ({
  status,
  preview,
  minHeight = 220,
}: Props) => {
  const theme = useMantineTheme()
  return (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight, pointerEvents: "none" }}
    >
      {preview.filter(Boolean).length ? (
        preview.map((url, i) => (
          <Image
            radius="md"
            height={100}
            sx={{ filter: "drop-shadow(0px 8px 8px rgba(0,0,0,.5))" }}
            width="auto"
            src={url}
            key={url + i}
          />
        ))
      ) : (
        <>
          <ImageUploadIcon
            status={status}
            style={{ color: getIconColor(status, theme) }}
            size={80}
          />

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Each file should not exceed 5mb
            </Text>
          </div>
        </>
      )}
    </Group>
  )
}

function ImageUploadIcon({
  status,
  ...props
}: ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />
  }

  if (status.rejected) {
    return <X {...props} />
  }

  return <Photo {...props} />
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7]
}
