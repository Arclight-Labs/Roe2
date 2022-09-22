import { Group } from "@mantine/core"
import useRoom from "../../../../hooks/useRoom.hook"
import CodmIngameTeam from "./Codm.ingame.team"
import bg from "./codm_ingame.png"

const CodmIngameScene = () => {
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
      <CodmIngameTeam side="teamA" />
      <CodmIngameTeam side="teamB" />
    </Group>
  )
}

export default CodmIngameScene
