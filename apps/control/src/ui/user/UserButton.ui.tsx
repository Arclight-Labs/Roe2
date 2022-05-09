import { FC, ReactNode } from "react"
import {
  Avatar,
  createStyles,
  Group,
  UnstyledButton,
  UnstyledButtonProps,
  Text,
  LoadingOverlay,
} from "@mantine/core"
import { ChevronRight } from "tabler-icons-react"
import { useAuth } from "../../context/auth/Auth.hooks"
import { UserMenu } from "./UserMenu.ui"

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
  return (
    <UserMenu
      sx={{ width: "100%" }}
      control={
        <UnstyledButton className={classes.user} {...props}>
          <LoadingOverlay visible={loading} />
          {user && (
            <Group>
              <Avatar src={user.avatar} radius="xl" />

              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {user.username}
                </Text>

                <Text color="dimmed" size="xs">
                  {user.email}
                </Text>
              </div>

              {icon || <ChevronRight size={14} />}
            </Group>
          )}
        </UnstyledButton>
      }
    />
  )
}
export default UserButton
