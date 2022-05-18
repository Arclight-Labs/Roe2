import {
  Avatar,
  Card,
  CardProps,
  Group,
  Stack,
  Text,
  Menu,
  Divider,
} from "@mantine/core"
import { User } from "interface"
import { FC, useState } from "react"
import {
  ArrowDownRightCircle,
  ArrowUpRightCircle,
  Pencil,
  Square1,
  Square2,
  Trash,
} from "tabler-icons-react"
import { setLive } from "utils/socket/events"
import { useLive } from "utils/hooks"
import { useBSave } from "../../context/bsave/bsave.hook"
import Confirm from "../popups/Confirm.ui"
import TalentModal from "./TalentModal.ui"
import { nanoid } from "@reduxjs/toolkit"
import { Live } from "interface/ws"
import TalentBadges from "./TalentBadges.ui"
import { defaultTalent } from "utils/general/defaultValues"
interface TalentCardProps extends Omit<CardProps<"div">, "children"> {
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
    const saveData: Partial<Live> = { talents }
    setLive(saveData)
    bSave(saveData)
  }

  const onAddActiveCaster = () => {
    const { [uid]: addedActiveTalent, ...activeTalents } = live.activeTalents
    const newTalent: User = {
      ...data,
      uid,
    }
    const saveData: Partial<Live> = {
      activeTalents: { ...activeTalents, [uid]: newTalent },
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
        <Menu position="bottom" placement="end" transition="pop-top-right">
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
