import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

import { Tournament } from "interface"

const initialState: Tournament = {
  name: "",
  id: 0,
}

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<Tournament>>) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export const { set } = tournamentSlice.actions
export default tournamentSlice.reducer
