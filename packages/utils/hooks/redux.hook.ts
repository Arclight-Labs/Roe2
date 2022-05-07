import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import {
  addMatch,
  setMatches,
  updateMatch,
  setParticipants,
  updateParticipant,
  addParticipant,
} from "../redux"
import type { RootState, AppDispatch } from "../redux/store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTournament = () => {
  return useAppSelector((s) => s.tournament)
}

export const useMatches = () => {
  const matches = useAppSelector((s) => s.matches)
  return { matches, setMatches, updateMatch, addMatch }
}

export const useParticipants = () => {
  const participants = useAppSelector((s) => s.participants)
  return { participants, setParticipants, updateParticipant, addParticipant }
}
