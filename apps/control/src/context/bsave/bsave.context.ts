import { PartialWithFieldValue } from "firebase/firestore"
import { Broadcast } from "interface/ws"
import { createContext } from "react"
import { asyncFn } from "utils/general/defaultValues"

export type BSave = (data: PartialWithFieldValue<Broadcast>) => Promise<void>
export const bSave = createContext<BSave>(asyncFn)
