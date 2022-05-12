import { Provider } from "react-redux"
import { store } from "utils/redux"
import { SocketProvider } from "utils/socket"
import { Box } from "@mantine/core"
import Routes from "./routes"
import { MantineProvider } from "ui"

import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <Box sx={{ height: 1080, width: 1920, overflow: "hidden" }}>
      <BrowserRouter>
        <Provider store={store}>
          <SocketProvider>
            <MantineProvider
              defaultProps={{
                Image: { imageProps: { style: { borderImageWidth: 0 } } },
              }}
            >
              <Routes />
            </MantineProvider>
          </SocketProvider>
        </Provider>
      </BrowserRouter>
    </Box>
  )
}

export default App
