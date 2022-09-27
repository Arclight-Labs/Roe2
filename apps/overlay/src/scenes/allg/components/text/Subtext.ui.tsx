import { Text, TextProps } from "@mantine/core"
import { PropsWithChildren } from "react"
import { textFont } from "../../allGValues"

const Subtext = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      {...props}
      sx={{
        fontFamily: textFont,
        color: "#fff",
        letterSpacing: 1.5,
        fontSize: 16,
        lineHeight: 1,
        ...props.sx,
      }}
    >
      {children}
    </Text>
  )
}

export default Subtext
