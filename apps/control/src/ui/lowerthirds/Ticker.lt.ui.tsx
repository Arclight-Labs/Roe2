import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Stack } from "@mantine/core"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { defaultTicker } from "utils/general/defaultValues"
import { useLt } from "utils/hooks"
import { TickerSchema, tickerSchema } from "utils/schema/lowerthird.schema"
import { setLive } from "utils/socket/events"
import { useBSave } from "../../context/bsave/bsave.hook"
import AdjTextarea from "../adj/AdjTextArea.ui"
import TextForm from "../adj/AdjTextInput.ui"

const LowerthirdTickerForm = () => {
  const formHandlers = useForm<TickerSchema>({
    defaultValues: defaultTicker,
    resolver: zodResolver(tickerSchema),
  })
  const bSave = useBSave()
  const { lt: liveLt, ticker } = useLt()
  const onSubmit = formHandlers.handleSubmit((data) => {
    const lt = { ...liveLt, data: { ...liveLt.data, ticker: data } }
    const newData = { lt }
    setLive(newData)
    bSave(newData)
  }, console.error)

  useEffect(() => {
    if (!ticker || !formHandlers.reset) return
    formHandlers.reset(ticker)
  }, [formHandlers.reset, ticker])

  return (
    <FormProvider {...formHandlers}>
      <form onSubmit={onSubmit}>
        <Stack spacing="xl">
          <TextForm name="headline" label="Headline" />
          <AdjTextarea
            name="verticalText"
            label="Vertical Text"
            textareaProps={{
              minRows: 3,
              autosize: true,
              description: "Each line is the next line",
            }}
          />
          <AdjTextarea
            name="scrollerText"
            label="Ticker"
            textareaProps={{
              minRows: 3,
              autosize: true,
              description: "Each line will be separated by '|' on stream",
            }}
          />
          <Group mt="sm">
            <Button size="xs" type="submit">
              Apply
            </Button>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default LowerthirdTickerForm
