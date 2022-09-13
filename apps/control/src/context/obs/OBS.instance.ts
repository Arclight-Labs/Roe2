import OBSWebSocket from "obs-websocket-js"
import { defaultObsCredential } from "utils/general/defaultValues"
const { url, password } = defaultObsCredential

const obs = new OBSWebSocket()
try {
  obs.connect(url, password)
} catch (e) {
  console.error(e)
}
export default obs
