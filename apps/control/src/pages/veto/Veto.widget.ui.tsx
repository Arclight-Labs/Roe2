import {
  Affix,
  Avatar,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { vetoJoin } from "utils/socket/events"
import { useVeto } from "./Veto.hook"

interface Props {
  hook: ReturnType<typeof useVeto>
}
const VetoWidget = ({ hook }: Props) => {
  const {
    activeActor,
    activeTeam,
    activeTeamCoinStatus,
    accessToken,
    seriesId,
    isActiveTeamReady,
    isOpponentReady,
  } = hook

  const ready = () => {
    if (!activeActor) {
      return showNotification({
        title: "Error",
        message: "Credentials not found",
      })
    }
    vetoJoin(accessToken)(seriesId, { ...activeActor, ready: true })
  }

  const { colorScheme } = useMantineColorScheme()
  return (
    <Affix position={{ bottom: 12 }} sx={{ width: "100%" }}>
      <Container size="lg">
        <Stack spacing="xs">
          {activeActor && (
            <Card
              withBorder={colorScheme === "light"}
              sx={{ alignSelf: "flex-end" }}
              p="xs"
            >
              <Text size="sm">
                Logged in as: <b>{activeActor.name}</b>
              </Text>
            </Card>
          )}
          <Card withBorder={colorScheme === "light"} sx={{ minHeight: 80 }}>
            <Stack>
              {activeTeam && (
                <Group sx={{ justifyContent: "space-between" }}>
                  <Group>
                    <Avatar size="lg" src={activeTeam.logo}></Avatar>
                    <Stack spacing={0}>
                      <Title order={4} sx={{ lineHeight: 1 }}>
                        {activeTeam.name}
                      </Title>
                      {<Text size="sm">Coin Flip: {activeTeamCoinStatus}</Text>}
                    </Stack>
                  </Group>
                  <Group>
                    {!isActiveTeamReady ? (
                      <Button onClick={ready} size="sm" variant="light">
                        Ready
                      </Button>
                    ) : !isOpponentReady ? (
                      <Title order={3}>AWAITING OPPONENT</Title>
                    ) : (
                      <Title order={3}>READY</Title>
                    )}
                  </Group>
                </Group>
              )}
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Affix>
  )
}

export default VetoWidget
