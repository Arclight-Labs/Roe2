import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Live } from "interface/ws"
import { defaultLive } from "../../general/defaultValues"

const initialState: Live = defaultLive

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
