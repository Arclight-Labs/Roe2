import { Group } from "@mantine/core"
import useRoom from "../../../../hooks/useRoom.hook"
import MlbbIngameTeam from "./Mlbb.ingame.team"
import bg from "./mlbb_ingame.png"

const MlbbIngameScene = () => {
  useRoom()

  return (
    <Group
      spacing={90}
      sx={{
        height: "100%",
        width: "100%",
        backgroundPosition: "top center",
        backgroundImage: `url("${bg}")`,
        backgroundSize: "contain",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <MlbbIngameTeam side="teamA" />
      <MlbbIngameTeam side="teamB" />
    </Group>
  )
}

export default MlbbIngameScene
