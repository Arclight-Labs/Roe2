import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { Aperture } from "tabler-icons-react"
import { useObs, useObsConnection } from "../../context/obs"
import { useObsConnectionDispatch } from "../../context/obs/OBS.hooks"

interface Props {
  variant?: "icon" | "button"
}

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

const OBSConnection = ({ variant = "button" }: Props) => {
  const { classes } = useStyles()
  const { isConnected, obs } = useObs()
  const { url, password } = useObsConnection()
  const { setUrl, setPassword } = useObsConnectionDispatch()
  const disconnect = async () => obs.disconnect()
  const connect = async () => {
    try {
      obs.connect(url, password || undefined)
    } catch (e) {
      showNotification({
        message: (e as Error)?.message || "Unable to connect to OBS Studio",
      })
    }
  }

  return (
    <Stack>
      <Popover withArrow withinPortal>
        <Popover.Target>
          {variant === "button" ? (
            <UnstyledButton className={classes.room} component="div">
              <Group>
                <ActionIcon size="xl" variant="transparent">
                  <Aperture size={38} />
                </ActionIcon>
                <Stack spacing={0}>
                  <Text size="sm" weight={500}>
                    Obs Connection
                  </Text>
                  <Text size="xs" color={isConnected ? "green" : "red"}>
                    {isConnected ? "OBS Connected" : "OBS Not Connected"}
                  </Text>
                </Stack>
              </Group>
            </UnstyledButton>
          ) : (
            <Tooltip
              position="right"
              label={isConnected ? "OBS Connected" : "OBS Not Connected"}
            >
              <ActionIcon
                variant={isConnected ? "filled" : "transparent"}
                color="green"
              >
                <Aperture />
              </ActionIcon>
            </Tooltip>
          )}
        </Popover.Target>

        <Popover.Dropdown>
          <Text>Connect to OBS</Text>
          <Stack spacing="xs">
            <TextInput
              size="xs"
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextInput
              size="xs"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Group>
              <Button
                onClick={disconnect}
                variant="subtle"
                disabled={!isConnected}
                size="xs"
              >
                Disconnect
              </Button>
              <Button disabled={isConnected} size="xs" onClick={connect}>
                Connect
              </Button>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Stack>
  )
}

export default OBSConnection
