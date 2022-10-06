import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Select,
  Stack,
  TextInput,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useHttpsCallable } from "react-firebase-hooks/functions"
import { useForm, UseFormReset } from "react-hook-form"
import { db, fn } from "utils/firebase"
import {
  VetoPreset,
  vetoPresetSchema,
  VetoSettings,
} from "utils/schema/veto.schema"
import { useAuth } from "../../context/auth/Auth.hooks"
interface Props extends ModalProps {
  reset: UseFormReset<VetoSettings>
  settings: VetoSettings
}
const MatchVetoPresetModal = ({ settings, reset, ...props }: Props) => {
  const { user } = useAuth()
  const [callable, callableLoading] = useHttpsCallable<
    Omit<VetoPreset, "id" | "owner">
  >(fn, "tournamentSeriesVeto-preset")
  const [opened, setOpened] = useState(false)
  const [selected, set] = useState<string | null>(null)
  const [presets = [], loading] = useCollectionData(
    collection(db, "veto_presets") as CollectionReference<VetoPreset>
  )

  const onConfirm = () => {
    const selectedPreset = presets.find((preset) => preset.id === selected)
    if (!selectedPreset) return
    reset(selectedPreset.settings)
    props.onClose()
  }

  const { register, handleSubmit } = useForm({
    defaultValues: { name: "", settings },
    resolver: zodResolver(vetoPresetSchema),
  })

  const submit = handleSubmit(async (data) => {
    await callable(data).catch((err) =>
      showNotification({ message: err.message })
    )
    setOpened(false)
  }, console.error)

  const deletePreset = () => {
    if (!selected) return
    deleteDoc(doc(db, "veto_presets", selected))
    set(null)
  }
  return (
    <Modal title="Veto Presets" size="lg" {...props}>
      <LoadingOverlay visible={loading} />
      <Stack>
        <Select
          data={presets.map((preset) => ({
            label: preset.name,
            value: preset.id,
          }))}
          value={selected}
          onChange={(value) => set(value)}
          label="Select a preset"
        ></Select>
        <Group position="right" noWrap>
          {!!selected && user?.type === "admin" && (
            <Button color="red" size="xs" onClick={deletePreset}>
              Delete selected
            </Button>
          )}
          <Button variant="light" size="xs" onClick={() => setOpened(true)}>
            Save current settings
          </Button>
          <Button size="xs" onClick={onConfirm} disabled={!selected}>
            Apply selected preset
          </Button>
        </Group>
      </Stack>
      <Modal
        title="Save Current Preset"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <LoadingOverlay visible={callableLoading} />
        <Stack>
          <TextInput label="Preset Name" {...register("name")} />
          <Group position="right">
            <Button size="xs" onClick={submit}>
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Modal>
  )
}

export default MatchVetoPresetModal
