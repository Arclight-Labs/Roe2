import {
  Avatar,
  Card,
  CardProps,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core"
import { nanoid } from "@reduxjs/toolkit"
import { User } from "interface"
import { Live } from "interface/ws"
import { FC, useState } from "react"
import {
  ArrowDownRightCircle,
  ArrowUpRightCircle,
  Pencil,
  Trash,
} from "tabler-icons-react"
import { useLive } from "utils/hooks"
import { setLive } from "utils/socket/events"
import { useBSave } from "../../context/bsave/bsave.hook"
import TalentBadges from "./TalentBadges.ui"
import TalentModal from "./TalentModal.ui"
interface TalentCardProps extends Omit<CardProps, "children"> {
  data: User
}
const TalentCard: FC<TalentCardProps> = ({ data, ...props }) => {
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)

  const { live } = useLive()
  const bSave = useBSave()
  const uid = data.uid || nanoid()

  const onCasterDelete = () => {
    const { [uid]: removedTalent, ...talents } = live.talents
    const { [uid]: removeActiveTalent, ...activeTalents } = live.activeTalents
    const saveData: Partial<Live> = { talents, activeTalents }
    setLive(saveData)
    bSave(saveData)
  }

  const onAddActiveCaster = () => {
    const { [uid]: addedActiveTalent, ...activeTalents } = live.activeTalents
    const newActiveTalent: User = {
      ...data,
      uid,
    }
    const saveData: Partial<Live> = {
      activeTalents: { ...activeTalents, [uid]: newActiveTalent },
    }
    setLive(saveData)
    bSave(saveData)
  }

  const onRemoveActiveCaster = () => {
    const { [uid]: removeActiveTalent, ...activeTalents } = live.activeTalents
    const saveData: Partial<Live> = { activeTalents }
    setLive(saveData)
    bSave(saveData)
  }

  return (
    <Card shadow="sm" {...props} sx={{ height: "100%", ...props.sx }}>
      <Group
        align="flex-start"
        spacing={2}
        sx={{ top: 2, right: 2, position: "absolute" }}
      >
        <TalentBadges talentId={data.uid} />
        <Menu position="bottom-end" transition="pop-top-right">
          {live.activeTalents[uid] ? (
            <Menu.Item
              onClick={onRemoveActiveCaster}
              icon={<ArrowDownRightCircle size={18} />}
              color="red"
            >
              Remove As Active Caster
            </Menu.Item>
          ) : (
            <Menu.Item
              onClick={onAddActiveCaster}
              icon={<ArrowUpRightCircle size={18} />}
            >
              Add As Active Caster
            </Menu.Item>
          )}
          <Divider my="md" label="Actions" labelPosition="center" />
          <Menu.Item onClick={open} icon={<Pencil size={18} />}>
            Edit
          </Menu.Item>
          <Menu.Item
            onClick={onCasterDelete}
            color="red"
            icon={<Trash size={18} />}
          >
            Delete
          </Menu.Item>
        </Menu>
      </Group>

      <Group>
        <Avatar src={data.avatar} size="md" />
        <Stack spacing={0}>
          <Text sx={{ lineHeight: 1 }}>{data.username}</Text>
          <Text color="dimmed" size="sm">
            @{data.socialHandle}
          </Text>
        </Stack>
      </Group>
      <TalentModal data={data} opened={opened} onClose={close} />
    </Card>
  )
}
export default TalentCard
