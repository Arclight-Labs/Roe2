import { Global } from "@mantine/core"
import regular from "./Avalanche-Regular.woff"

export function Avalanche() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Avalanche",
            src: `url('${regular}') format("woff")`,
          },
        },
      ]}
    />
  )
}
