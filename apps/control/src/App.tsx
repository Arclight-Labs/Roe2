import { ColorScheme, ColorSchemeProvider } from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { NotificationsProvider } from "@mantine/notifications"
import { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { MantineProvider } from "ui"
import { connectEmulators } from "utils/firebase"
import { store } from "utils/redux"
import { SocketProvider } from "utils/socket"
import AuthProvider from "./context/auth/Auth.provider"
import { ObsProvider } from "./context/obs"
import { GreycliffCF } from "./fonts/GreyCliffCF/GreyCliffCF.font"
import Routes from "./routes"
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
                    <ObsProvider>
                      <Routes />
                    </ObsProvider>
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
