import { useState } from "react"
import { MantineProvider } from "ui"
import { ColorScheme, ColorSchemeProvider } from "@mantine/core"
import AppShell from "./ui/AppShell"

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <AppShell>test</AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
