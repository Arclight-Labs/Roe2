import { useLive } from "utils/hooks"

type TeamSide = "teamA" | "teamB"
type UseInverse = () => (teamSide: TeamSide) => TeamSide

export const useInverse: UseInverse = () => {
  const { live } = useLive()
  return (teamSide) => {
    const isTeamA = teamSide === "teamA"

    if (live.invert) {
      if (isTeamA) return "teamB"
      return "teamA"
    }
    if (isTeamA) return "teamA"
    return "teamB"
  }
}
