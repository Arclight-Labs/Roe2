import {
  MantineProvider as Provider,
  MantineProviderProps,
} from "@mantine/core"
import { FC } from "react"
import { MantineSettings } from "./MantineSettings"

export const MantineProvider: FC<MantineProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <Provider
      withNormalizeCSS
      withGlobalStyles
      {...props}
      theme={{ ...MantineSettings, ...props.theme }}
    >
      {children}
    </Provider>
  )
}
