import { Global } from "@mantine/core"
import bold from "./Druk-Wide-Bold.woff"

export function DrukWide() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "DrukWide",
            src: `url('${bold}') format("woff")`,
          },
        },
      ]}
    />
  )
}
