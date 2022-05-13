import { Global } from "@mantine/core"
import ultra from "./Industry-Ultra.woff"

export function Industry() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Industry",
            src: `url('${ultra}') format("woff")`,
          },
        },
      ]}
    />
  )
}
