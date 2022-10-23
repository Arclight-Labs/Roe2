import { Group } from "@mantine/core"
import useRoom from "../../../../hooks/useRoom.hook"
import WrIngameTeam from "./Wr.ingame.team"
import bg from "./wr_ingame.png"

const WrIngameScene = () => {
  useRoom()

  return (
    <Group
      sx={{
        height: "100%",
        width: "100%",
        backgroundPosition: "top center",
        backgroundImage: `url("${bg}")`,
        backgroundSize: "contain",
        fontWeight: "bold",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <WrIngameTeam side="teamA" />
      <WrIngameTeam side="teamB" />
    </Group>
  )
}

export default WrIngameScene
