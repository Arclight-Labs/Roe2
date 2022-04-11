import { Button } from "@mantine/core"
import { useAppSelector } from "utils"
import { useTournamentAction } from "../contexts/socket"

const TextComponent = () => {
  const tournament = useAppSelector((state) => state.tournament)
  const { setTournament } = useTournamentAction()
  const onClick = () => {
    setTournament({ name: `${Math.random() * 10}` })
  }
  return (
    <div>
      <div className="">{JSON.stringify(tournament)}</div>
      <Button onClick={onClick}>test</Button>
    </div>
  )
}

export default TextComponent
