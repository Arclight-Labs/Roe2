import { Provider } from "react-redux"
import { store } from "utils/redux"
import { SocketProvider } from "utils/socket"
import { Box } from "@mantine/core"
import Routes from "./routes"
import { MantineProvider } from "ui"

import { BrowserRouter } from "react-router-dom"
import { GreycliffCF } from "./fonts/GreyCliffCF/GreyCliffCF.font"
import { Industry } from "./fonts/Industry/Industry.font"
import { Avalanche } from "./fonts/Avalanche/Avalanche.font"
import { DrukWide } from "./fonts/DrukWide/DrukWide.font"
import { Roboto } from "./fonts/Roboto/Roboto.font"

function App() {
  return (
    <Box
      sx={{
        height: 1080,
        width: 1920,
        overflow: "hidden",
        "&::webkit-scrollbar": {
          display: "none",
        },
      }}
    >
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
              <Roboto />
              <DrukWide />
              <Avalanche />
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
