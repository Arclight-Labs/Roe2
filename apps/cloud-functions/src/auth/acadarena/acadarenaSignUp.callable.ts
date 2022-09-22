import { functions } from "../../admin"
import { Err } from "../../utils/cfError"
import { runtimeOptions } from "../../utils/cfRuntimeOptions"

interface Props {
  code: string
}
export const signUpAcadArena = functions
  .runWith(runtimeOptions)
  .https.onCall(async ({ code }: Props) => {
    if (!code) throw new Err("invalid-argument", "Code is required")
  })
