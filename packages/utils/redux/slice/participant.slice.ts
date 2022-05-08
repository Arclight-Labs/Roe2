import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  SanitizedParticipant,
  SanitizedParticipantMap,
} from "interface/waypoint"
import { nanoid } from "nanoid"

type SetMatchesAction = PayloadAction<SanitizedParticipantMap>
type UpdateParticipantPayload = {
  teamId: string
  data: Partial<SanitizedParticipant>
}

type UpdateParticipantAction = PayloadAction<UpdateParticipantPayload>
type AddParticipantPayload = { teamId?: string; data: SanitizedParticipant }
type AddParticipantAction = PayloadAction<AddParticipantPayload>

const initialState: SanitizedParticipantMap = {}

const participantSlice = createSlice({
  initialState,
  name: "matches",
  reducers: {
    setParticipants(state, action: SetMatchesAction) {
      return { ...state, ...action.payload }
    },

    updateParticipant(state, action: UpdateParticipantAction) {
      const matchId = action.payload.teamId
      const data = action.payload.data
      if (!state[matchId]) return state
      return { ...state, [matchId]: { ...state[matchId], ...data } }
    },

    addParticipant(state, action: AddParticipantAction) {
      const matchId = action.payload.teamId || nanoid(6)
      return { ...state, [matchId]: action.payload.data }
    },
  },
})

export const { setParticipants, updateParticipant, addParticipant } =
  participantSlice.actions
export default participantSlice.reducer
