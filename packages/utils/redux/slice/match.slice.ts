import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SanitizedSeries, SanitizedSeriesMap } from "interface/waypoint"
import { nanoid } from "nanoid"

type SetMatchesAction = PayloadAction<SanitizedSeriesMap>
type UpdateMatchPayload = { matchId: string; data: Partial<SanitizedSeries> }
type UpdateMatchAction = PayloadAction<UpdateMatchPayload>
type AddMatchPayload = { matchId?: string; data: SanitizedSeries }
type AddMatchAction = PayloadAction<AddMatchPayload>

const initialState: SanitizedSeriesMap = {}

const matchSlice = createSlice({
  initialState,
  name: "matches",
  reducers: {
    setMatches(state, action: SetMatchesAction) {
      return { ...state, ...action.payload }
    },

    updateMatch(state, action: UpdateMatchAction) {
      const matchId = action.payload.matchId
      const data = action.payload.data
      if (!state[matchId]) return state
      return { ...state, [matchId]: { ...state[matchId], ...data } }
    },

    addMatch(state, action: AddMatchAction) {
      const matchId = action.payload.matchId || nanoid(6)
      return { ...state, [matchId]: action.payload.data }
    },
  },
})

export const { setMatches, updateMatch, addMatch } = matchSlice.actions
export default matchSlice.reducer
