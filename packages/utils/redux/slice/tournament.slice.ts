import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { Waypoint } from "interface"

const initialState: Waypoint.Tournament = {
  leagueId: "",
  leagueTitle: "",
  _leagueTitle: "",
  activePlayerCountPerTeam: 5,
  admins: [],
  customFields: {},
  maxSubPlayerPerTeam: 1,
  orgId: "",
  tournament: {
    name: "",
  },
  id: "",
  visibility: "public",
}

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<Waypoint.Tournament>>) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export const { set: setTournament } = tournamentSlice.actions
export default tournamentSlice.reducer
