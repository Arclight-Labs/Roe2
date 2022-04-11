import { useState } from "react"
import { MantineProvider } from "ui"
import { ColorScheme, ColorSchemeProvider } from "@mantine/core"
import AppShell from "./ui/AppShell"
import { Provider } from "react-redux"
import { store } from "utils"
import TextComponent from "./pages/TextComponent"
import SocketProvider from "./contexts/socket"

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <Provider store={store}>
      <SocketProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider theme={{ colorScheme }}>
            <AppShell version={import.meta.env.PACKAGE_VERSION}>
              <TextComponent />
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>
      </SocketProvider>
    </Provider>
  )
}

export default App
