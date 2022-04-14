import { Button } from "@mantine/core"
import { useAppSelector } from "utils/hooks"
import { useTournamentAction } from "utils/socket"

const TextComponent = () => {
  const tournament = useAppSelector((state) => state.tournament)
  const { ping } = useTournamentAction()
  const onClick = () => {
    ping(Date.now())
  }
  return (
    <div>
      <div className="">{JSON.stringify(tournament)}</div>
      <Button onClick={onClick}>test</Button>
    </div>
  )
}

export default TextComponent
