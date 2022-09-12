import {
  ActionIcon,
  Box,
  Card,
  Group,
  Menu,
  Radio,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { Ad } from "interface/ws/Live.interface"
import { FC } from "react"
import { Eye, EyeOff, Pencil } from "tabler-icons-react"
import { adjImageStyles, defaultAdjImage } from "utils/general"
import { useLt } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useBSave } from "../../context/bsave/bsave.hook"
import AdModal from "./AdModal.ui"

interface AdCardProps {
  ad: Ad
}
const AdCard: FC<AdCardProps> = ({ ad }) => {
  const [preview, togglePreview] = useToggle([false, true])
  const [open, toggler] = useToggle([false, true])
  const toggle = () => toggler()
  const close = () => toggler(false)
  const { ad: ltAd, lt } = useLt()
  const bSave = useBSave()

  const isActive = ltAd === ad.id

  const setAd = (value: string) => () => {
    const newLtData = { ...lt.data, ad: value }
    const newLt = { ...lt, data: newLtData }
    const saveData = { lt: newLt }
    setLive(saveData)
    bSave?.(saveData)
  }

  return (
    <Card sx={{ overflow: "visible" }}>
      <Group spacing={5} sx={{ position: "absolute", top: 10, right: 10 }}>
        <Tooltip label="Preview" withArrow>
          <ActionIcon onClick={() => togglePreview()}>
            {preview ? <EyeOff size={18} /> : <Eye size={18} />}
          </ActionIcon>
        </Tooltip>
        <Menu>
          <Menu.Item onClick={toggle} icon={<Pencil size={18} />}>
            Edit
          </Menu.Item>
          {!isActive ? (
            <Menu.Item onClick={setAd(ad.id)} icon={<Pencil size={18} />}>
              Set as active
            </Menu.Item>
          ) : (
            <Menu.Item
              onClick={setAd("")}
              icon={<Pencil size={18} />}
              color="red"
            >
              Unset as active
            </Menu.Item>
          )}
        </Menu>
      </Group>
      <Group noWrap align="center">
        <Radio
          size="xl"
          value=""
          checked={ad.id === ltAd}
          onClick={setAd(ad.id)}
        />
        <Box
          sx={{
            ...adjImageStyles(
              preview
                ? ad.image
                : {
                    ...defaultAdjImage,
                    URL: ad.image.URL,
                    BASE64: ad.image.BASE64,
                    adj: {
                      h: 80,
                      w: 120,
                    },
                  }
            ),
          }}
        />
        <Stack spacing={4}>
          <Title
            order={4}
            sx={{
              fontSize: preview ? ad.headline.size || "inherit" : "inherit",
              lineHeight: 1,
            }}
          >
            {ad.headline.text}
          </Title>
          <Text
            sx={{
              fontSize: preview ? ad.body.size || "inherit" : "inherit",
              lineHeight: 1,
            }}
            lineClamp={3}
          >
            {ad.body.text}
          </Text>
        </Stack>
      </Group>
      <AdModal ad={ad} opened={open} onClose={close} />
    </Card>
  )
}

export default AdCard
