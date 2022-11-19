import { MantineThemeOverride } from "@mantine/core"

export const MantineSettings: MantineThemeOverride = {
  components: {
    Kbd: { defaultProps: { sx: { fontSize: 10 } } },
  },
}
