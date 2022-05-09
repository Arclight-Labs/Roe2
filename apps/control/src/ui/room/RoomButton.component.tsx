import {
  Avatar,
  createStyles,
  Group,
  UnstyledButton,
  UnstyledButtonProps,
  Text,
  useMantineTheme,
  Stack,
} from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { ChevronRight, Message } from "tabler-icons-react"
import { useRoom } from "../../context/room/Room.hooks"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import { RoomMenu } from "./RoomMenu.component"

const useStyles = createStyles((theme) => ({
  room: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}))

interface RoomButtonProps extends UnstyledButtonProps<"button"> {}
const RoomButton = (props: RoomButtonProps) => {
  const activeRoom = useRoom()

  const { classes } = useStyles()
  const theme = useMantineTheme()

  const navigate = useNavigate()
  return activeRoom ? (
    <RoomMenu
      sx={{ width: "100%" }}
      control={
        <UnstyledButton className={classes.room} {...props}>
          <Group>
            {activeRoom.avatar ? (
              <Avatar src={activeRoom.avatar} radius="xl" />
            ) : (
              <Stack
                sx={(theme) => ({
                  width: 38,
                  height: 38,
                  borderRadius: "100%",
                  backgroundColor: theme.colors.gray[0],
                })}
                justify="center"
                align="center"
              >
                <Message color={theme.colors.gray[6]} size={27} />
              </Stack>
            )}

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {activeRoom?.name}
              </Text>
              <Text size="xs" color="dimmed">
                Active Room
              </Text>
            </div>

            <ChevronRight size={14} />
          </Group>
        </UnstyledButton>
      }
    />
  ) : (
    <UnstyledButton
      className={classes.room}
      {...props}
      onClick={() => navigate("/rooms")}
    >
      <Group>
        <Stack
          sx={(theme) => ({
            width: 38,
            height: 38,
            borderRadius: "100%",
            backgroundColor: theme.colors.red[0],
          })}
          justify="center"
          align="center"
        >
          <Message color={theme.colors.red[6]} size={27} />
        </Stack>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500} color={theme.colors.red[6]}>
            Select Room
          </Text>
        </div>
        <ChevronRight size={14} />
      </Group>
    </UnstyledButton>
  )
}

export default RoomButton
