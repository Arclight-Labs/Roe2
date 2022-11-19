import {
  Box,
  BoxProps,
  Stack,
  StackProps,
  Text,
  TextProps,
  Tooltip,
} from "@mantine/core"
import { forwardRef } from "react"
import { Coin as TablerCoin, CoinOff, IconProps } from "tabler-icons-react"

interface Props extends BoxProps {
  result: "winner" | "loser"
  IconProps?: IconProps
  StackProps?: StackProps
  TextProps?: TextProps
  showText?: boolean
}

const Coin = forwardRef<HTMLDivElement, Props>(
  ({ result, IconProps, StackProps, TextProps, showText, ...props }, ref) => {
    return (
      <Box {...props} ref={ref}>
        <Tooltip label={`Coin flip ${result}`}>
          <Stack spacing={0} align="center" {...StackProps}>
            {result === "winner" ? (
              <TablerCoin size={40} {...IconProps} />
            ) : (
              <CoinOff size={40} {...IconProps} />
            )}
            {showText && (
              <Text size="xs" {...TextProps}>
                {result.toUpperCase()}
              </Text>
            )}
          </Stack>
        </Tooltip>
      </Box>
    )
  }
)

export default Coin
