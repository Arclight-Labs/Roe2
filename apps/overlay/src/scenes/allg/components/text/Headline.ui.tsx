import { Text, TextProps } from "@mantine/core"
import { PropsWithChildren } from "react"
import {
  headlineFont,
  headlineLetterSpacing,
  headlineLineHeight,
  yellow,
} from "../../allGValues"

const Headline = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      {...props}
      sx={{
        fontFamily: headlineFont,
        letterSpacing: headlineLetterSpacing,
        fontSize: 37,
        lineHeight: headlineLineHeight,
        color: yellow,
        ...props.sx,
      }}
    >
      {children}
    </Text>
  )
}

export default Headline
