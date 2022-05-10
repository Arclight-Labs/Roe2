import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SanitizedParticipantMap } from "interface/waypoint"
import { Payload } from "interface/ws"
import { nanoid } from "nanoid"

type SetParticipantsAction = PayloadAction<Payload.TeamsSet>

type UpdateParticipantAction = PayloadAction<Payload.TeamUpdate>
type AddParticipantAction = PayloadAction<Payload.TeamAdd>

const initialState: SanitizedParticipantMap = {}

const participantSlice = createSlice({
  initialState,
  name: "participants",
  reducers: {
    setParticipants(_, action: SetParticipantsAction) {
      return action.payload
    },

    updateParticipant(state, action: UpdateParticipantAction) {
      const matchId = action.payload.teamId
      const data = action.payload.data
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
