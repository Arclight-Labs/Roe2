import {
  Alert,
  Card,
  Center,
  Container,
  Group,
  List,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
} from "@mantine/core"
import { Bulb, Check, Coin, Dice5, Minus, X } from "tabler-icons-react"
import { useScreen } from "ui/Screen.hook"
import ParticipantInline from "../../ui/participant/ParticipantInline.ui"
import { useVeto } from "./Veto.hook"
import VetoWidget from "./Veto.widget.ui"

const VetoPage = () => {
  const hook = useVeto()
  const {
    veto,
    side,
    accessToken,
    currentSequence,
    teams,
    coinStatus,
    coinFlip,
    readyCheck,
    settings,
    coinResult,
    getMode,
    getMap,
  } = hook

  const isViewer = () => {
    return !side || !accessToken
  }

  const isReady = () => {
    return (
      readyCheck.teamA &&
      readyCheck.teamB &&
      (readyCheck.host || settings.autoStart)
    )
  }

  const getReadyIcon = (side: "teamA" | "teamB" | "host") => {
    return (
      <ThemeIcon variant="light" size="sm">
        {readyCheck[side] ? <Check /> : <Minus />}
      </ThemeIcon>
    )
  }

  const activeTimelineItem = (): number => {
    if (!isReady()) return 0
    if (!coinFlip.result) return 1
    return currentSequence + 2
  }

  const getTeamByCoinResult = (actor: "winner" | "loser" | null) => {
    if (!actor) return ""
    return <ParticipantInline team={coinResult[actor]} />
  }

  const { sm } = useScreen()
  const actionPastTense = {
    ban: "vetoed",
    pick: "picked",
    decider: "Decider map: ",
  }

  const sides = {
    red: settings.redSideName,
    blue: settings.blueSideName,
  }

  const { seedWinner } = settings
  return (
    <Container size="lg" sx={{ height: "100vh" }}>
      {!veto ? (
        <Alert>
          Veto is not set for this match, please contact tournament admins
        </Alert>
      ) : (
        <>
          <Center py="xl" pb={sm ? 120 : 180}>
            <Timeline bulletSize={30} radius="sm" active={activeTimelineItem()}>
              <Timeline.Item title="Ready Check" bullet={<Coin />}>
                <Card withBorder>
                  <List size="sm" spacing={0}>
                    <List.Item icon={getReadyIcon("teamA")}>
                      <ParticipantInline team={teams.teamA} />
                    </List.Item>
                    <List.Item icon={getReadyIcon("teamB")}>
                      <ParticipantInline team={teams.teamB} />
                    </List.Item>
                    <List.Item icon={getReadyIcon("host")}>
                      <Text color="dimmed">
                        Host{settings.autoStart ? " (Auto Start)" : ""}
                      </Text>
                    </List.Item>
                  </List>
                </Card>
              </Timeline.Item>
              <Timeline.Item
                title={seedWinner ? "Seed" : "Coin Flip"}
                bullet={<Coin />}
                color="yellow"
              >
                <Card withBorder>
                  <Stack spacing={0}>
                    {!seedWinner && (
                      <Text size="sm" sx={{ textTransform: "capitalize" }}>
                        Result: {coinStatus}
                      </Text>
                    )}
                    <Group spacing="xs">
                      <Text size="sm">
                        {seedWinner ? "Seed Winner:" : "Heads:"}
                      </Text>
                      {coinFlip.heads ? (
                        <ParticipantInline
                          team={teams[coinFlip.heads]}
                          sx={(theme) => ({
                            border:
                              coinFlip.result === "heads"
                                ? `1px solid ${theme.colors.gray[4]}`
                                : "",
                            borderRadius: 5,
                          })}
                        />
                      ) : (
                        <Text size="sm">pending</Text>
                      )}
                    </Group>
                    <Group spacing="xs">
                      <Text size="sm">
                        {seedWinner ? "Seed Loser:" : "Tails:"}
                      </Text>
                      {coinFlip.tails ? (
                        <ParticipantInline
                          team={teams[coinFlip.tails]}
                          px="xs"
                          sx={(theme) => ({
                            border:
                              coinFlip.result === "tails"
                                ? `1px solid ${theme.colors.gray[4]}`
                                : "",
                            borderRadius: 5,
                          })}
                        />
                      ) : (
                        <Text size="sm">pending</Text>
                      )}
                    </Group>
                  </Stack>
                </Card>
              </Timeline.Item>
              {veto.sequence.map((sequence, index) => (
                <Timeline.Item
                  key={index}
                  bullet={
                    sequence.action === "ban" ? (
                      <X />
                    ) : sequence.action === "decider" ? (
                      <Dice5 />
                    ) : (
                      <Check />
                    )
                  }
                  color={sequence.action === "ban" ? "red" : "blue"}
                  title={`${sequence.action?.toUpperCase()}${
                    sequence.mode ? ` (${getMode(sequence.mode)?.name})` : ""
                  }`}
                >
                  <Stack spacing={0}>
                    <Card withBorder>
                      <Stack>
                        <Text size="sm" color="dimmed">
                          {sequence.action !== "decider"
                            ? ` ${seedWinner ? "Seed" : "Coin flip"} ${
                                sequence.mapActor
                              } ${sequence.action}s a
                           map.`
                            : `Map is selected randomly.`}
                          {sequence.sideActor && sequence.sideActor !== "random"
                            ? ` ${seedWinner ? "Seed" : "Coin flip"} ${
                                sequence.sideActor
                              } chooses which side to play first`
                            : ""}
                        </Text>

                        {index <= currentSequence && isReady() && (
                          <Card
                            withBorder
                            sx={{
                              position: "relative",
                              "&::before": {
                                content: "''",
                                position: "absolute",
                                zIndex: 1,
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundImage: `url("${
                                  getMap(sequence.mapPicked)?.imageUrl
                                }")`,
                                filter: `grayScale(${
                                  sequence.action === "ban" ? 1 : 0
                                })`,
                              },
                            }}
                          >
                            <Center sx={{ position: "relative", zIndex: 10 }}>
                              {sequence.mapPicked ? (
                                <Stack spacing="xs">
                                  <Group
                                    position="center"
                                    spacing={5}
                                    p="xs"
                                    sx={{
                                      backgroundColor: "rgba(0,0,0,.75)",
                                      borderRadius: 5,
                                      color: "#fff",
                                    }}
                                  >
                                    <Text size="sm">
                                      <b>
                                        {getTeamByCoinResult(sequence.mapActor)}
                                      </b>
                                    </Text>
                                    <Text size="sm">
                                      {
                                        actionPastTense[
                                          sequence.action || "ban"
                                        ]
                                      }
                                    </Text>
                                    <Text size="sm">
                                      <b>{getMap(sequence.mapPicked)?.name}</b>
                                    </Text>
                                  </Group>
                                  {sequence.status === "awaitingSidePick" && (
                                    <Group
                                      position="center"
                                      spacing={5}
                                      p="xs"
                                      sx={{
                                        backgroundColor: "rgba(0,0,0,.75)",
                                        borderRadius: 5,
                                        color: "#fff",
                                      }}
                                    >
                                      <Text size="sm">Awaiting for</Text>
                                      <Text size="sm">
                                        <b>
                                          {sequence.sideActor !== "random" &&
                                            getTeamByCoinResult(
                                              sequence.sideActor
                                            )}
                                        </b>
                                      </Text>
                                      <Text size="sm">to pick a side</Text>
                                    </Group>
                                  )}

                                  {sequence.status === "complete" &&
                                    (sequence.action === "pick" ||
                                      sequence.action === "decider") && (
                                      <Group
                                        position="center"
                                        spacing={5}
                                        p="xs"
                                        sx={{
                                          backgroundColor: "rgba(0,0,0,.75)",
                                          borderRadius: 5,
                                          color: "#fff",
                                        }}
                                      >
                                        <Text size="sm">
                                          <b>
                                            {sequence.sideActor !== "random"
                                              ? getTeamByCoinResult(
                                                  sequence.sideActor
                                                )
                                              : getTeamByCoinResult("winner")}
                                          </b>
                                        </Text>
                                        {sequence.sidePicked &&
                                          (sequence.sideActor === "random" ? (
                                            <Text size="sm">
                                              plays{" "}
                                              <b>
                                                {sides[sequence.sidePicked]}
                                              </b>{" "}
                                              (random)
                                            </Text>
                                          ) : (
                                            <Text size="sm">
                                              chose{" "}
                                              <b>
                                                {sides[sequence.sidePicked]}
                                              </b>
                                            </Text>
                                          ))}
                                      </Group>
                                    )}
                                </Stack>
                              ) : (
                                <Group spacing="xs" p="xs">
                                  <Text size="sm">Awaiting for</Text>
                                  <b>
                                    {getTeamByCoinResult(sequence.mapActor)}
                                  </b>
                                  <Text size="sm">
                                    to {sequence.action} a map
                                  </Text>
                                </Group>
                              )}
                            </Center>
                          </Card>
                        )}
                        {sequence.description && (
                          <Alert icon={<Bulb />} variant="filled">
                            {sequence.description}
                          </Alert>
                        )}
                      </Stack>
                    </Card>
                  </Stack>
                </Timeline.Item>
              ))}
            </Timeline>
          </Center>
          {!isViewer() && <VetoWidget hook={hook} />}
        </>
      )}
    </Container>
  )
}

export default VetoPage
