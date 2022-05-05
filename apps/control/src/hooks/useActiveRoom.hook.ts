import { useLocalStorage } from "@mantine/hooks"
import { Room } from "interface"
import { RoomModel } from "utils/models/Room.model"

export const useActiveRoom = () =>
  useLocalStorage<RoomModel | null>({
    key: "activeRoom",
    defaultValue: null,
    serialize: (room) => JSON.stringify(room?.toJSON() || null),
    deserialize: (json) => {
      const data = json ? (JSON.parse(json) as Room | null) : null
      console.log(data)
      if (!data) return null
      return new RoomModel(data)
    },
  })
