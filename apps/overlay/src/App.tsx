import { Box } from "@mantine/core"
import { Provider } from "react-redux"
import { MantineProvider } from "ui"
import { store } from "utils/redux"
import { SocketProvider } from "utils/socket"
import Routes from "./routes"

import { BrowserRouter } from "react-router-dom"
import { Avalanche } from "./fonts/Avalanche/Avalanche.font"
import { DrukWide } from "./fonts/DrukWide/DrukWide.font"
import { GreycliffCF } from "./fonts/GreyCliffCF/GreyCliffCF.font"
import { Industry } from "./fonts/Industry/Industry.font"
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
              theme={{
                components: {
                  Stack: { defaultProps: { spacing: 0 } },
                  Group: { defaultProps: { spacing: 0 } },
                  Image: {
                    defaultProps: {
                      imageProps: { style: { borderImageWidth: 0 } },
                    },
                  },
                },
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
