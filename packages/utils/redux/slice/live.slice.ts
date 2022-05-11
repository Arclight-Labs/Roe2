import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Live } from "interface/ws"

const initialState: Live = {
  activeMatch: "",
  invert: false,
  nextMatch: "",
  prevMatches: [],
  schedule: [],
}

export const liveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<Live>>) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export const { set: setLiveReducer } = liveSlice.actions
export default liveSlice.reducer
