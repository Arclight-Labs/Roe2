import { Group } from "@mantine/core"
import useRoom from "../../../../hooks/useRoom.hook"
import ValIngameTeam from "./Val.ingame.team"
import bg from "./val_ingame.png"

const ValorantIngameScene = () => {
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
      <ValIngameTeam side="teamA" />
      <ValIngameTeam side="teamB" />
    </Group>
  )
}

export default ValorantIngameScene
