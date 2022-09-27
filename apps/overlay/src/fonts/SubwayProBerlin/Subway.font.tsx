import { Global } from "@mantine/core"
import medium from "./Subway.otf"

export function SubwayPropBerlin() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Subway",
            src: `url('${medium}') format("opentype")`,
          },
        },
      ]}
    />
  )
}
