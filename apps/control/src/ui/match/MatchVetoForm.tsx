import { zodResolver } from "@hookform/resolvers/zod"
import {
  Alert,
  Button,
  Card,
  Group,
  Select,
  Stack,
  Tabs,
  Text,
} from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { SanitizedSeries } from "interface/waypoint"
import { MouseEventHandler } from "react"
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
import {
  VetoPasswordRequest,
  vetoPasswordRequestSchema,
  VetoPasswordType,
  VetoSettings,
  vetoSettingsSchema,
  VetoSettingsType,
} from "utils/schema/veto.schema"
import { useWsAction } from "utils/socket"
import { useAuth } from "../../context/auth/Auth.hooks"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import MatchVetoMapPoolForm from "./MatchVetoMapPoolForm"
import MatchVetoModesForm from "./MatchVetoModesForm"
import MatchVetoSequenceForm from "./MatchVetoSequenceForm"

interface Props {
  match: SanitizedSeries
  onClose: VoidFunction
}
const MatchVetoSettingsForm = ({ match, onClose }: Props) => {
  const [executeCallable] = useHttpsCallable<VetoPasswordRequest, string>(
    fn,
    "tournamentSeriesVeto-getCredentials"
  )

  const clipboard = useClipboard()
  const [room] = useActiveRoom()
  const { vetoSettings } = useWsAction()
  const { accessToken } = useAuth()
  const { control, setValue, watch, handleSubmit } = useForm<VetoSettings>({
    defaultValues: match.veto?.settings ?? defaultVetoSettings,
    resolver: zodResolver(vetoSettingsSchema),
  })

  const isEdit = !!match.veto
  const modes = watch("modes")
  const mapPool = watch("mapPool")
  const sequence = watch("sequence")
  const vetoType = watch("type")

  const onSubmit = handleSubmit(
    (data) => {
      if (!accessToken) return
      vetoSettings(accessToken)(`${match.id}`, data)
      onClose()
    },
    (err) => {
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

      const res = await executeCallable(data)
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
                modes={modes ?? []}
                sequence={sequence ?? []}
              />
            </Tabs.Panel>
          </Tabs>
        </Card>
      )}
      {isEdit && (
        <Stack>
          <Card withBorder>
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
        <Button size="xs" onClick={onSubmit}>
          Save
        </Button>
      </Group>
    </Stack>
  )
}

export default MatchVetoSettingsForm
