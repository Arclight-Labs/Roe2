import { Affix, Loader, Transition } from "@mantine/core"
import { PropsWithChildren, useState } from "react"
import { asyncFn } from "utils/general/defaultValues"
import { useRoom } from "../room/Room.hooks"
import { BSave, bSave } from "./bsave.context"

const BSaveProvider = ({ children }: PropsWithChildren<{}>) => {
  const room = useRoom()
  const [loading, setLoading] = useState(false)

  const load = () => setLoading(true)
  const stopLoad = () => setLoading(false)

  const saveFn: BSave = async (data) => {
    load()
    await room?.save(data)
    stopLoad()
    return
  }

  return (
    <bSave.Provider value={saveFn}>
      {children}
      <Affix position={{ top: 10, right: 10 }}>
        <Transition mounted={loading} transition="fade">
          {(styles) => <Loader style={styles} size="xs" />}
        </Transition>
      </Affix>
    </bSave.Provider>
  )
}

export default BSaveProvider
