import { zodResolver } from "@hookform/resolvers/zod"
import { Group, Switch, Textarea } from "@mantine/core"
import { doc, DocumentReference, updateDoc } from "firebase/firestore"
import { Rundown } from "interface/db"
import { ChangeEventHandler, useEffect } from "react"
import { useForm } from "react-hook-form"
import { db } from "utils/firebase"
import { defaultRundownCallout } from "utils/general/defaultValues"
import {
  rundownCalloutSchema,
  RundownCalloutSchema,
} from "utils/schema/rundown.schema"

interface Props {
  rundown: Rundown
}
const RundownViewCalloutSettings = ({ rundown }: Props) => {
  const { watch, register, handleSubmit, reset, setValue } =
    useForm<RundownCalloutSchema>({
      defaultValues: rundown.callout || defaultRundownCallout,
      resolver: zodResolver(rundownCalloutSchema),
    })

  const live = watch("live")

  useEffect(() => {
    if (!reset || !rundown) return
    reset(rundown.callout || defaultRundownCallout)
  }, [rundown, reset])

  const submit = handleSubmit((data) => {
    const ref = doc(db, "rundowns", rundown.id) as DocumentReference<Rundown>
    updateDoc(ref, { callout: data })
  }, console.error)

  const toggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue("live", e.target.checked)
    submit(e)
  }

  return (
    <Group>
      <Textarea
        sx={{ minWidth: 400 }}
        {...register("text")}
        label="Director Callout"
      />
      <Switch checked={live} onChange={toggle} />
    </Group>
  )
}

export default RundownViewCalloutSettings
