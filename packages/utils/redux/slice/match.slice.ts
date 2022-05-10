import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SanitizedSeriesMap } from "interface/waypoint"
import { Payload } from "interface/ws"
import { nanoid } from "nanoid"

type SetMatchesAction = PayloadAction<Payload.MatchesSet>
type UpdateMatchAction = PayloadAction<Payload.MatchUpdate>
type AddMatchAction = PayloadAction<Payload.MatchAdd>

const initialState: SanitizedSeriesMap = {}

const matchSlice = createSlice({
  initialState,
  name: "matches",
  reducers: {
    setMatches(_, action: SetMatchesAction) {
      return action.payload
    },

    updateMatch(state, action: UpdateMatchAction) {
      const matchId = action.payload.matchId
      const data = action.payload.data
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
