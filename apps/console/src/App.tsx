import { useState } from "react"
import { MantineProvider } from "ui"
import { ColorScheme, ColorSchemeProvider } from "@mantine/core"
import { Provider } from "react-redux"
import { store } from "utils/redux"
import { SocketProvider } from "utils/socket"
import { NotificationsProvider } from "@mantine/notifications"
import { CookiesProvider } from "react-cookie"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import Routes from "./routes"
import AuthProvider from "./context/auth/Auth.provider"

export const queryClient = new QueryClient()

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <AuthProvider>
      <BrowserRouter>
        <CookiesProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <NotificationsProvider>
                <SocketProvider>
                  <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                  >
                    <MantineProvider theme={{ colorScheme }}>
                      <Routes />
                    </MantineProvider>
                  </ColorSchemeProvider>
                </SocketProvider>
              </NotificationsProvider>
            </QueryClientProvider>
          </Provider>
        </CookiesProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
