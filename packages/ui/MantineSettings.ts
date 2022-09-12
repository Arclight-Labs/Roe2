import { MantineThemeOverride } from "@mantine/core"

export const MantineSettings: MantineThemeOverride = {
  components: {
    Kbd: { defaultProps: { sx: { fontSize: 10 } } },
    Menu: { defaultProps: { withinPortal: true } },
    Popover: { defaultProps: { withinPortal: true } },
  },
}
