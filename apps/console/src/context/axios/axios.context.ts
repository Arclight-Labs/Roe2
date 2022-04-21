import { createContext } from "react"
import ax from "utils/api/axios"

export const axios = createContext(ax(window.location.hostname))
