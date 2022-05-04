import { useLocalStorage } from "@mantine/hooks"
import { Room } from "interface"

export const useActiveRoom = () =>
  useLocalStorage<Room | null>({
    key: "activeRoom",
    defaultValue: null,
  })
