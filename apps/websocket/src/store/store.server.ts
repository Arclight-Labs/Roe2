import { WebsocketStore } from "interface/ws"

type GetStore = () => WebsocketStore
type SetStoreFn = (state: WebsocketStore) => WebsocketStore
type SetStorePayload = SetStoreFn | WebsocketStore
type SetStore = (action: SetStorePayload) => void

let store: WebsocketStore = {
  rooms: {},
}

// ================ STORE
export const setStore: SetStore = (action) => {
  const isFn = typeof action === "function"
  if (isFn) {
    store = action(store)
    return
  }
  store = action
}

export const getStore: GetStore = () => store
