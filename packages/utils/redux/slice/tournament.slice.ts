import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { Waypoint } from "interface"

const initialState: Waypoint.ApiRes = {
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
  matches: {},
  participants: {},
}

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<Waypoint.ApiRes>>) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export const { set: setTournament } = tournamentSlice.actions
export default tournamentSlice.reducer
