import { configureStore } from "@reduxjs/toolkit"
import tournament from "./slice/tournament.slice"
import matches from "./slice/match.slice"
import participants from "./slice/participant.slice"

export const store = configureStore({
  reducer: { tournament, matches, participants },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const globalDispatch = store.dispatch
