import { Alert, Stack } from "@mantine/core"
import OBSConnection from "../../ui/obs/OBSConnection.ui"

const OBSPage = () => {
  return (
    <Stack>
      <OBSConnection />
      <Alert>This is a work in progress page</Alert>
    </Stack>
  )
}

export default OBSPage
