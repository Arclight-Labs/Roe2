import { uuidv4 } from "@firebase/util"
import {
  Avatar,
  Box,
  Card as MantineCard,
  CardProps,
  Center,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { Rundown, RundownFlowItem } from "interface/db"
import { Broadcast } from "interface/ws"
import { forwardRef } from "react"
import { defaultSeries, tbd } from "utils/general"
type Status = { status: "prev" | "curr" | "next" }
type CardPropsWithStatus = CardProps & Status

const Card = forwardRef<HTMLDivElement, CardPropsWithStatus & { aKey: string }>(
  (props, ref) => {
    const { status } = props
    const maxHeight = status === "next" ? 50 : status === "prev" ? 50 : "auto"
    return (
      <AnimatePresence>
        <Box style={{ height: "100%", overflow: "hidden" }}>
          <motion.div
            key={props.aKey}
            initial={{
              y: "50%",
              opacity: status === "prev" ? 0.2 : status === "next" ? 0 : 1,
            }}
            animate={{ y: 0, opacity: status === "curr" ? 1 : 0.2 }}
            exit={{
              y: "-50%",
              opacity: 1,
            }}
            style={{ height: "100%" }}
          >
            <MantineCard
              {...props}
              sx={{
                height: "100%",
                maxHeight,
                transition: "all 0.3s ease",
                ...props.sx,
              }}
              ref={ref}
            />
          </motion.div>
        </Box>
      </AnimatePresence>
    )
  }
)

interface Props extends Omit<CardPropsWithStatus, "children"> {
  rundown: Rundown
  flowItem: (RundownFlowItem & { flowNumber: number }) | null
  hiddenColumns: string[]
  broadcast: Broadcast
}
const RundownViewItem = ({
  flowItem,
  hiddenColumns,
  status,
  broadcast,
  rundown: { columnOrder, columns },
  ...props
}: Props) => {
  const { colors } = useMantineTheme()
  const match = flowItem?.matchId
    ? broadcast.matches[flowItem.matchId] || defaultSeries
    : null
  const participants = Object.values(broadcast.participants)
  const teamA =
    participants.find(
      (p) => !!match?.teamA.id && p.chalId === match?.teamA.id
    ) || tbd
  const teamB =
    participants.find(
      (p) => !!match?.teamB.id && p.chalId === match?.teamB.id
    ) || tbd
  return (
    <tr style={{ height: "100%" }}>
      <td style={{ border: "none", width: 10 }}>
        <Card
          aKey={flowItem?.id || uuidv4()}
          status={status}
          sx={{
            backgroundColor:
              (flowItem?.flowNumber || 0) % 2 == 0
                ? colors.blue[5]
                : colors.gray[8],
            opacity: 1,
          }}
        >
          <Center sx={{ height: "100%" }}>
            <Title>{flowItem?.flowNumber}</Title>
          </Center>
        </Card>
      </td>
      <td style={{ border: "none", transition: "all 0.15s ease-out" }}>
        <Card aKey={flowItem?.id + uuidv4()} status={status} {...props}>
          <Text size="xl" weight="bold">
            {flowItem?.title}
          </Text>
          <Text size="md" sx={{ whiteSpace: "pre-wrap" }}>
            {flowItem?.desc}
          </Text>
        </Card>
      </td>
      {!hiddenColumns.includes("match") && (
        <td style={{ border: "none", height: "100%", width: 300 }}>
          <Card aKey={flowItem?.id + uuidv4()} status={status} {...props}>
            <MantineCard.Section>
              <Text size={10} pl={5} color="dimmed">
                Match
              </Text>
            </MantineCard.Section>
            <Center sx={{ height: "100%" }}>
              {flowItem?.matchId ? (
                <Group noWrap>
                  <Avatar src={teamA.logo} />
                  <Text size="sm">{teamA.shortcode || "TBD"}</Text>
                  <Text>VS</Text>
                  <Text size="sm">{teamB.shortcode || "TBD"}</Text>
                  <Avatar src={teamB.logo} />
                </Group>
              ) : (
                <Text size="sm" color="dimmed">
                  NOT SET
                </Text>
              )}
            </Center>
          </Card>
        </td>
      )}
      {columnOrder
        .filter((c) => !hiddenColumns.includes(c))
        .map((column) => {
          const col = columns[column]?.name
          return col ? (
            <td style={{ border: "none", height: "100%" }}>
              <Card aKey={flowItem?.id + uuidv4()} status={status} {...props}>
                <MantineCard.Section>
                  <Text
                    size={10}
                    pl={5}
                    color="dimmed"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {col}
                  </Text>
                </MantineCard.Section>
                <Text sx={{ whiteSpace: "pre-wrap" }}>
                  {flowItem?.columns[column]}
                </Text>
              </Card>
            </td>
          ) : null
        })}
    </tr>
  )
}

export default RundownViewItem
