import { Global } from "@mantine/core"
import regular from "./Avalanche-Regular.ttf"

export function Avalanche() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Avalanche",
            src: `url('${regular}') format("ttf")`,
          },
        },
      ]}
    />
  )
}
