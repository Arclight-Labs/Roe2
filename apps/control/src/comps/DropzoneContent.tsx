import {
  MantineTheme,
  Group,
  Text,
  useMantineTheme,
  Image,
} from "@mantine/core"
import { DropzoneStatus } from "@mantine/dropzone"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"
import {
  faFileArrowUp,
  faImage,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

interface Props {
  status: DropzoneStatus
  preview: string[]
}
export const DropzoneContent = ({ status, preview }: Props) => {
  const theme = useMantineTheme()
  return (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight: 220, pointerEvents: "none" }}
    >
      {preview.filter(Boolean).length ? (
        preview.map((url, i) => (
          <Image
            radius="md"
            height={100}
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
            fontSize={80}
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
}: Omit<FontAwesomeIconProps, "icon"> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <FontAwesomeIcon {...props} icon={faFileArrowUp} />
  }

  if (status.rejected) {
    return <FontAwesomeIcon {...props} icon={faXmark} />
  }

  return <FontAwesomeIcon {...props} icon={faImage} />
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
