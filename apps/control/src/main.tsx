import React from "react"
import App from "./App"
import { createRoot } from "react-dom/client"

const rootElement: HTMLElement = document.getElementById("root")!
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
