import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { Tournament } from "interface"

const initialState: Tournament = { name: "", _id: 0 }

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

export const { set: setTournament } = tournamentSlice.actions
export default tournamentSlice.reducer
