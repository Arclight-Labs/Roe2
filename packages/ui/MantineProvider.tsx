import { FC } from "react"
import {
  MantineProvider as Provider,
  MantineProviderProps,
} from "@mantine/core"
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
      defaultProps={{
        Kbd: { sx: { fontSize: 10 } },
      }}
    >
      {children}
    </Provider>
  )
}
