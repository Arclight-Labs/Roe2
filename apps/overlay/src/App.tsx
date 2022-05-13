import { Provider } from "react-redux"
import { store } from "utils/redux"
import { SocketProvider } from "utils/socket"
import { Box } from "@mantine/core"
import Routes from "./routes"
import { MantineProvider } from "ui"

import { BrowserRouter } from "react-router-dom"
import { GreycliffCF } from "./fonts/GreyCliffCF/GreyCliffCF.font"
import { Industry } from "./fonts/Industry/Industry.font"

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
              {/* Add Fonts Here */}
              <GreycliffCF />
              <Industry />
            </MantineProvider>
          </SocketProvider>
        </Provider>
      </BrowserRouter>
    </Box>
  )
}

export default App
