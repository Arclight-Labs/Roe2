import { Global } from "@mantine/core"
import tablet from "./tablet_gothic.ttf"

export function TabletGothic() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Tablet",
            src: `url('${tablet}') format("truetype")`,
          },
        },
      ]}
    />
  )
}
