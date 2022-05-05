import { useAppSelector } from "utils/hooks"

const TournamentPage = () => {
  const tournament = useAppSelector((s) => s.tournament)
  return <div>TournamentPage</div>
}

export default TournamentPage
