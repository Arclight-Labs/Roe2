import {
  Affix,
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core"
import { useState } from "react"
import { vetoClaimCoin, vetoReady } from "utils/socket/events"
import VetoActionModal from "./veto.action.modal"
import { useVeto } from "./Veto.hook"

interface Props {
  hook: ReturnType<typeof useVeto>
}
const VetoWidget = ({ hook }: Props) => {
  const [opened, setOpenned] = useState(false)
  const {
    activeTeam,
    activeTeamCoinStatus,
    accessToken,
    seriesId,
    isActiveTeamReady,
    isOpponentReady,
    coinResult,
    isYourTurn,
    side,
    sequenceItem,
    isComplete,
  } = hook

  const ready = () => {
    vetoReady(accessToken)(seriesId, { side, ready: true })
  }

  const claimCoin = (coinSide: "heads" | "tails") => () => {
    if (side === "host") return
    vetoClaimCoin(accessToken)(seriesId, {
      coinSide,
      teamSide: side,
    })
  }

  const open = () => {
    setOpenned(true)
  }

  const close = () => {
    setOpenned(false)
  }

  const { colorScheme } = useMantineColorScheme()
  return (
    <Affix position={{ bottom: 12 }} sx={{ width: "100%" }}>
      <Container size="lg">
        <Stack spacing="xs">
          <Card withBorder={colorScheme === "light"} sx={{ minHeight: 80 }}>
            <Stack>
              {activeTeam && (
                <Group sx={{ justifyContent: "space-between" }}>
                  <Group>
                    <Box
                      sx={{
                        height: 60,
                        width: 60,
                        backgroundSize: "contain",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${activeTeam.logo})`,
                      }}
                    />
                    <Stack spacing={0}>
                      <Title order={4} sx={{ lineHeight: 1 }}>
                        {activeTeam.name}
                      </Title>
                      {<Text size="sm">Coin flip {activeTeamCoinStatus}</Text>}
                    </Stack>
                  </Group>
                  <Group>
                    {!isActiveTeamReady ? (
                      <Button onClick={ready} size="sm" variant="light">
                        Ready
                      </Button>
                    ) : !isOpponentReady ? (
                      <Title order={3}>AWAITING OPPONENT</Title>
                    ) : !coinResult.winner ? (
                      <Stack spacing="xs" align="center">
                        <Stack spacing={0} align="center">
                          <Title order={6}>Claim your side of the coin</Title>
                          <Text size="xs">
                            Claiming first will automatically set the opposing
                            side
                          </Text>
                        </Stack>
                        <Group>
                          <Button size="md" onClick={claimCoin("heads")}>
                            Heads
                          </Button>
                          <Button size="md" onClick={claimCoin("tails")}>
                            Tails
                          </Button>
                        </Group>
                      </Stack>
                    ) : isYourTurn() ? (
                      <Stack spacing={5}>
                        <Title order={3} align="center">
                          Your turn to {sequenceItem.action}
                          {sequenceItem.status === "awaitingSidePick" &&
                            " a side"}
                        </Title>
                        <Button
                          size="md"
                          color={sequenceItem.action === "ban" ? "red" : "blue"}
                          onClick={open}
                        >
                          {sequenceItem.action?.toUpperCase()}
                          {sequenceItem.status === "awaitingSidePick" &&
                            " SIDE"}
                        </Button>
                        <VetoActionModal
                          opened={opened}
                          onClose={close}
                          hook={hook}
                        ></VetoActionModal>
                      </Stack>
                    ) : isComplete() ? (
                      <Title order={3}>VETO COMPLETE</Title>
                    ) : (
                      <Title order={3}>AWAITING OPPONENT</Title>
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
