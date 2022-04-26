import { useContext } from "react"
import { axios } from "./axios.context"

export const useAx = () => useContext(axios)
