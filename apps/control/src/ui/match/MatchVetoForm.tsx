import { zodResolver } from "@hookform/resolvers/zod"
import {
  Alert,
  Button,
  Card,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { SanitizedSeries } from "interface/waypoint"
import { MouseEventHandler, useState } from "react"
import { useHttpsCallable } from "react-firebase-hooks/functions"
import { useForm } from "react-hook-form"
import {
  AdjustmentsAlt,
  AlertTriangle,
  Bulb,
  ListDetails,
  Photo,
} from "tabler-icons-react"
import { fn } from "utils/firebase"
import { defaultVetoSettings } from "utils/general/defaultValues"
import { useParticipants } from "utils/hooks"
import {
  VetoPasswordRequest,
  vetoPasswordRequestSchema,
  VetoPasswordType,
  VetoSettings,
  vetoSettingsSchema,
  VetoSettingsType,
} from "utils/schema/veto.schema"
import { useWsAction } from "utils/socket"
import { vetoReset } from "utils/socket/events"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import Confirm from "../popups/Confirm.ui"
import MatchVetoMapPoolForm from "./MatchVetoMapPoolForm"
import MatchVetoModesForm from "./MatchVetoModesForm"
import MatchVetoPresetModal from "./MatchVetoPresetModal"
import MatchVetoSequenceForm from "./MatchVetoSequenceForm"

interface Props {
  match: SanitizedSeries
}
const MatchVetoSettingsForm = ({ match }: Props) => {
  const [presetsOpened, setPresetsOpened] = useState(false)
  const [executeCallable] = useHttpsCallable<VetoPasswordRequest, string>(
    fn,
    "tournamentSeriesVeto-getCredentials"
  )

  const { chalTeams } = useParticipants()

  const teams = {
    teamA: chalTeams[match.teamA.id || 0],
    teamB: chalTeams[match.teamB.id || 0],
  }
  const [loading, setLoading] = useState(false)
  const clipboard = useClipboard()
  const [room] = useActiveRoom()
  const { vetoSettings } = useWsAction()
  const { accessToken } = useAuth()
  const { control, setValue, watch, handleSubmit, register, reset } =
    useForm<VetoSettings>({
      defaultValues: match.veto?.settings ?? defaultVetoSettings,
      resolver: zodResolver(vetoSettingsSchema),
    })

  const isEdit = !!match.veto

  const watchAll = watch()
  const { modes, mapPool, sequence, type: vetoType, seedWinner } = watchAll
  const onSubmit = handleSubmit(
    (data) => {
      if (!accessToken) return
      vetoSettings(accessToken)(`${match.id}`, data)
    },
    (err) => {
      console.log(err)
      const msg = Object.values(err)
        .map((e) => e.message)
        .join("\n")

      showNotification({
        title: "Error",
        message: msg,
        color: "red",
        icon: <Bulb />,
      })
    }
  )

  const getLink =
    (type: VetoPasswordType): MouseEventHandler<HTMLButtonElement> =>
    async () => {
      const roomId = room?.id
      const seriesId = match.id.toString()

      const validateRes = vetoPasswordRequestSchema.safeParse({
        roomId,
        seriesId,
        type,
      })

      if (!validateRes.success) {
        showNotification({
          title: "Error",
          message: validateRes.error.message,
          color: "red",
          icon: <Bulb />,
        })
        return
      }
      const { data } = validateRes
      setLoading(true)
      const res = await executeCallable(data)
      setLoading(false)
      if (!res) {
        showNotification({
          title: "Error",
          message: "Could not get url",
          color: "red",
          icon: <Bulb />,
        })
        return
      }
      const url = `${window.location.host}/veto/${roomId}/${seriesId}?type=${type}&accessToken=${res.data}`
      clipboard.copy(url)
      showNotification({
        title: "Success",
        message: "Copied to clipboard",
        color: "green",
      })
    }

  const selectType = (value: VetoSettingsType | null) => {
    setValue("type", value || "standard")
  }

  const selectSeedWinner = (value: "teamA" | "teamB" | null) => {
    setValue("seedWinner", value)
  }

  const restartVeto = () => {
    const seriesId = match.id.toString()
    vetoReset(accessToken)(seriesId)
  }

  return (
    <Stack>
      <Select
        label="Veto Type"
        value={vetoType}
        data={[
          { value: "standard", label: "Standard" },
          { value: "coinFlipOnly", label: "Coin Flip Only" },
        ]}
        onChange={selectType}
      />

      {vetoType === "standard" && (
        <>
          <Select
            clearable
            label="Seed Winner (optional)"
            value={seedWinner || ""}
            onChange={selectSeedWinner}
            data={[
              {
                value: "teamA",
                label: teams.teamA?.name || "Team A",
              },
              { value: "teamB", label: teams.teamB?.name || "TeamB" },
            ]}
          />
          <Card withBorder>
            <Tabs variant="outline" defaultValue="mapPool">
              <Tabs.List>
                <Tabs.Tab value="mapPool" icon={<Photo size={14} />}>
                  Map Pool
                </Tabs.Tab>
                <Tabs.Tab value="modes" icon={<AdjustmentsAlt size={14} />}>
                  Modes
                </Tabs.Tab>
                <Tabs.Tab value="sequence" icon={<ListDetails size={14} />}>
                  Sequence
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="mapPool" pt="md">
                <MatchVetoMapPoolForm
                  control={control}
                  setValue={setValue}
                ></MatchVetoMapPoolForm>
              </Tabs.Panel>

              <Tabs.Panel value="modes" pt="md">
                <MatchVetoModesForm
                  mapPool={mapPool || []}
                  control={control}
                  setValue={setValue}
                  modes={modes ?? []}
                />
              </Tabs.Panel>
              <Tabs.Panel value="sequence" pt="md">
                <MatchVetoSequenceForm
                  control={control}
                  setValue={setValue}
                  seedWinner={seedWinner}
                  modes={modes ?? []}
                  sequence={sequence ?? []}
                  mapPool={mapPool ?? []}
                />
              </Tabs.Panel>
            </Tabs>
          </Card>
        </>
      )}

      <Card withBorder>
        <Stack>
          <TextInput {...register("redSideName")} label="Red Side Name" />
          <TextInput {...register("blueSideName")} label="Blue Side Name" />
        </Stack>
      </Card>

      {isEdit && (
        <Stack>
          <Card withBorder>
            <LoadingOverlay visible={loading} />
            <Stack>
              <Text>Links</Text>
              <Alert icon={<AlertTriangle size={16} />}>
                Only share these links to team captains
              </Alert>
              <Group>
                <Button color="gray" onClick={getLink("host")}>
                  Copy Host Link
                </Button>
                <Button onClick={getLink("teamA")}>Copy Team A Link</Button>
                <Button onClick={getLink("teamB")}>Copy Team B Link</Button>
              </Group>
            </Stack>
          </Card>
        </Stack>
      )}
      <Group sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="light"
          size="xs"
          onClick={() => setPresetsOpened(true)}
        >
          Presets
        </Button>
        {isEdit && (
          <Confirm onConfirm={restartVeto}>
            <Button color="red" size="xs">
              Restart Veto
            </Button>
          </Confirm>
        )}
        <Button size="xs" onClick={onSubmit}>
          Save
        </Button>
      </Group>
      <MatchVetoPresetModal
        settings={watchAll}
        opened={presetsOpened}
        onClose={() => setPresetsOpened(false)}
        reset={reset}
      />
    </Stack>
  )
}

export default MatchVetoSettingsForm
