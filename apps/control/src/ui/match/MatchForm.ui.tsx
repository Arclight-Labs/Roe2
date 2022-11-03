import { zodResolver } from "@hookform/resolvers/zod"
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  NumberInput,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core"
import { SanitizedSeries } from "interface/waypoint"
import { ChangeEventHandler } from "react"
import { useForm } from "react-hook-form"
import { DeviceFloppy, Plus, Trash } from "tabler-icons-react"
import { defaultSeries, tbd } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import { MatchSchema, matchSchema } from "utils/schema/match.schema"
import { setMatches } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import MatchCardTeam from "./MatchCardTeam.ui"
import MatchFormTeamSelect from "./MatchFormTeamSelect.ui"

type Handler = ChangeEventHandler<HTMLInputElement>
type ChangeWinner = (chalId?: number | null | undefined) => () => void
type ChangeScore = (team: "teamA" | "teamB", matchIndex: number) => Handler

interface MatchFormProps {
  match?: SanitizedSeries
  onCancel?: VoidFunction
  afterSubmit?: VoidFunction
}
const MatchForm = ({
  match = defaultSeries,
  onCancel,
  afterSubmit,
}: MatchFormProps) => {
  const { chalTeams } = useParticipants()
  const { getScore, getUpdatedMatches, matches: liveMatches } = useMatches()
  const { accessToken } = useAuth()
  const { handleSubmit, watch, setValue } = useForm<MatchSchema>({
    defaultValues: {
      scores: match.scores,
      teamA: match.teamA.id,
      teamB: match.teamB.id,
      winnerId: match.winnerId,
      bestOf: match.bestOf ?? 1,
    },
    resolver: zodResolver(matchSchema),
  })
  const aChalId = watch("teamA")
  const bChalId = watch("teamB")
  const bestOf = watch("bestOf")
  const scoresInput = watch("scores")
  const winnerId = watch("winnerId")
  const a = chalTeams[aChalId || ""] ?? tbd
  const b = chalTeams[bChalId || ""] ?? tbd
  const aName = a.shortcode || a.shortname || a.name
  const bName = b.shortcode || b.shortname || b.name
  const isCustom = !!match.custom

  const setTeam = (team: "teamA" | "teamB") => (chalId: number | null) => {
    setValue(team, chalId)
  }

  const matchWithNewScore = { ...match, scores: scoresInput }
  const scores = getScore(matchWithNewScore)

  const changeWinner: ChangeWinner = (chalId) => () => {
    if (!chalId) return
    setValue("winnerId", winnerId === chalId ? null : chalId)
  }

  const addMatch = () => {
    if (scoresInput.length >= 7) return
    setValue("scores", [...scoresInput, "0-0"])
  }

  const deleteMatch = (index: number) => () => {
    if (scoresInput.length === 1) return
    const newScores = scoresInput.filter((_, ii) => ii !== index)
    setValue("scores", newScores)
  }

  const onChangeScore: ChangeScore = (team, matchIndex) => (e) => {
    const value = e.target.valueAsNumber
    const newScores = scoresInput

    let matchScore = newScores[matchIndex]
    const [aScore = 0, bScore = 0] = matchScore.split("-").map(Number)

    if (team === "teamA") {
      matchScore = `${value}-${bScore}`
    } else {
      matchScore = `${aScore}-${value}`
    }

    newScores[matchIndex] = matchScore
    setValue("scores", newScores)
  }

  const save = handleSubmit((data) => {
    const matchId =
      match.id || Math.floor(Math.random() * 599999999999) + 300000000 // used when creating custom match
    const newSeriesData: SanitizedSeries = {
      ...match,
      teamA: {
        ...match.teamA,
        id: data.teamA,
      },
      teamB: {
        ...match.teamB,
        id: data.teamB,
      },
      winnerId: data.winnerId,
      loserId: winnerId
        ? winnerId !== data.teamA
          ? data.teamA
          : data.teamB
        : null,
      scores: data.scores,
      id: matchId,
      bestOf: data.bestOf,
    }

    const updatedMatches = getUpdatedMatches(newSeriesData)
    setMatches(accessToken)(updatedMatches)

    afterSubmit?.()
  })

  const onDelete = () => {
    if (!match.custom) return
    const newMatches = { ...liveMatches }
    delete newMatches[match.id]
    setMatches(accessToken)(newMatches)
    afterSubmit?.()
  }

  return (
    <form onSubmit={save}>
      <Stack align="center">
        <Group spacing="xl" noWrap>
          <MatchFormTeamSelect
            disabled={!isCustom}
            onSelectTeam={setTeam("teamA")}
          >
            <MatchCardTeam team={a} dir="rtl" />
          </MatchFormTeamSelect>
          <MatchFormTeamSelect
            disabled={!isCustom}
            onSelectTeam={setTeam("teamB")}
          >
            <MatchCardTeam team={b} />
          </MatchFormTeamSelect>
        </Group>
        <Title order={5}>
          {scores.teamA.final} - {scores.teamB.final}
        </Title>

        <Group sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ whiteSpace: "nowrap" }}>
            <thead>
              <tr>
                <th></th>
                {scoresInput.map((_, index) => (
                  <th style={{ whiteSpace: "nowrap" }} key={index}>
                    Game {index + 1}
                  </th>
                ))}
                <th style={{ width: "100%" }}>
                  <ActionIcon onClick={addMatch}>
                    <Plus size={14} />
                  </ActionIcon>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ minWidth: 200 }}>
                  <Group noWrap>
                    <Checkbox
                      checked={!!winnerId && winnerId === aChalId}
                      onChange={changeWinner(aChalId)}
                      disabled={!aChalId}
                    />
                    <Text>{aName}</Text>
                  </Group>
                </td>
                {scores.teamA.scores.map((score, index) => (
                  <td key={index} style={{ maxWidth: 40 }}>
                    <TextInput
                      sx={{ maxWidth: 60 }}
                      type="number"
                      value={score}
                      onChange={onChangeScore("teamA", index)}
                    />
                  </td>
                ))}
                <td />
              </tr>
              <tr>
                <td style={{ minWidth: 200 }}>
                  <Group noWrap>
                    <Checkbox
                      checked={!!winnerId && winnerId === bChalId}
                      onChange={changeWinner(bChalId)}
                      disabled={!bChalId}
                    />
                    <Text>{bName}</Text>
                  </Group>
                </td>
                {scores.teamB.scores.map((score, index) => (
                  <td key={index} style={{ maxWidth: 40 }}>
                    <TextInput
                      sx={{ maxWidth: 60 }}
                      value={score}
                      type="number"
                      onChange={onChangeScore("teamB", index)}
                    />
                  </td>
                ))}
                <td />
              </tr>
              <tr>
                <td></td>
                {scoresInput.length > 1 &&
                  scoresInput.map((_, i) => (
                    <td key={i} align="center">
                      <Tooltip label={`Delete Game ${i + 1}`}>
                        <ActionIcon onClick={deleteMatch(i)}>
                          <Trash size={14} color="red" />
                        </ActionIcon>
                      </Tooltip>
                    </td>
                  ))}
              </tr>
            </tbody>
          </Table>
        </Group>
        <NumberInput
          label="Best of"
          value={bestOf}
          onChange={(value) => setValue("bestOf", value)}
          step={2}
          min={1}
        />
        <Group position="apart" sx={{ width: "100%" }}>
          {isCustom ? (
            <Button variant="subtle" onClick={onDelete} color="red">
              Delete
            </Button>
          ) : (
            <Button variant="subtle" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" leftIcon={<DeviceFloppy size={16} />}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
export default MatchForm
