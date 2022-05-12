import {
  Avatar,
  Card,
  CardProps,
  Group,
  Stack,
  Text,
  Menu,
} from "@mantine/core"
import { User } from "interface"
import { FC, useState } from "react"
import { Pencil } from "tabler-icons-react"
import TalentModal from "./TalentModal.ui"

interface TalentCardProps extends Omit<CardProps<"div">, "children"> {
  data: User
}
const TalentCard: FC<TalentCardProps> = ({ data, ...props }) => {
  const [opened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  return (
    <Card shadow="sm" {...props} sx={{ height: "100%", ...props.sx }}>
      <Menu
        sx={{ position: "absolute", top: 5, right: 5 }}
        position="bottom"
        placement="end"
        transition="pop-top-right"
        closeOnItemClick
      >
        <Menu.Item onClick={open} icon={<Pencil size={18} />}>
          Edit
        </Menu.Item>
      </Menu>
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
