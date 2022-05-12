import { useEffect } from "react"
import { MantineProvider } from "ui"
import { ColorScheme, ColorSchemeProvider } from "@mantine/core"
import { Provider } from "react-redux"
import { store } from "utils/redux"
import { SocketProvider } from "utils/socket"
import { NotificationsProvider } from "@mantine/notifications"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import Routes from "./routes"
import AuthProvider from "./context/auth/Auth.provider"
import { connectEmulators } from "utils/firebase"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { GreycliffCF } from "./fonts/GreyCliffCF/GreyCliffCF.font"

export const queryClient = new QueryClient()

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  useHotkeys([["mod+J", () => toggleColorScheme()]])

  useEffect(() => {
    if (import.meta.env.DEV) {
      connectEmulators()
    }
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NotificationsProvider>
              <SocketProvider>
                <ColorSchemeProvider
                  colorScheme={colorScheme}
                  toggleColorScheme={toggleColorScheme}
                >
                  <MantineProvider
                    theme={{
                      colorScheme,
                      headings: { fontFamily: "Greycliff CF, sans-serif" },
                    }}
                  >
                    <Routes />
                    <GreycliffCF />
                  </MantineProvider>
                </ColorSchemeProvider>
              </SocketProvider>
            </NotificationsProvider>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
