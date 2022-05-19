import { Global } from "@mantine/core"
import medium from "./Roboto-Medium.ttf"

export function Roboto() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Roboto",
            src: `url('${medium}') format("ttf")`,
          },
        },
      ]}
    />
  )
}
