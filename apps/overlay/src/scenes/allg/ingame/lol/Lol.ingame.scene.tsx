import { Group } from "@mantine/core"
import useRoom from "../../../../hooks/useRoom.hook"
import LolIngameTeam from "./Lol.ingame.team"
import bg from "./lol_ingame.png"

const LolIngameScene = () => {
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
      <LolIngameTeam side="teamA" />
      <LolIngameTeam side="teamB" />
    </Group>
  )
}

export default LolIngameScene
