import {
  Group,
  Image,
  MantineTheme,
  Text,
  useMantineTheme,
} from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { ComponentProps } from "react"
import { Icon as TablerIcon, Photo, Upload, X } from "tabler-icons-react"

type Status = "accept" | "reject" | "idle"
type ImageProps = (status: Status) => ComponentProps<TablerIcon>
interface Props {
  preview: string[]
  minHeight?: number
}
export const DropzoneContent = ({ preview, minHeight = 220 }: Props) => {
  const theme = useMantineTheme()
  const imageProps: ImageProps = (status) => ({
    style: { color: getIconColor(status, theme) },
    size: 80,
  })
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
          <Dropzone.Accept>
            <Upload {...imageProps("accept")} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <X {...imageProps("reject")} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Photo {...imageProps("idle")} />
          </Dropzone.Idle>

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

function getIconColor(status: Status, theme: MantineTheme) {
  return status === "accept"
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status === "reject"
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7]
}
