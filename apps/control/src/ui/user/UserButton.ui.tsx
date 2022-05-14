import { FC, ReactNode } from "react"
import {
  Avatar,
  createStyles,
  Group,
  UnstyledButton,
  UnstyledButtonProps,
  Text,
  LoadingOverlay,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core"
import { ChevronRight } from "tabler-icons-react"
import { useAuth } from "../../context/auth/Auth.hooks"
import { UserMenu } from "./UserMenu.ui"
import { useScreen } from "ui/Screen.hook"

const useStyles = createStyles((theme) => ({
  user: {
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

interface UserButtonProps extends UnstyledButtonProps<"button"> {
  icon?: ReactNode
}
const UserButton: FC<UserButtonProps> = ({ icon, ...props }) => {
  const { user, loading } = useAuth()
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const { sm } = useScreen()
  return (
    <UserMenu
      sx={{ width: "100%" }}
      control={
        <UnstyledButton
          className={classes.user}
          {...props}
          sx={{ padding: sm ? theme.spacing.md : 5 }}
        >
          <LoadingOverlay visible={loading} />
          {user && (
            <Group noWrap>
              <Avatar src={user.avatar} radius="xl" />

              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user.username}
                  </Text>

                  <Text color="dimmed" size="xs">
                    {user.email}
                  </Text>
                </div>
              </MediaQuery>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                {icon || <ChevronRight size={14} />}
              </MediaQuery>
            </Group>
          )}
        </UnstyledButton>
      }
    />
  )
}
export default UserButton
