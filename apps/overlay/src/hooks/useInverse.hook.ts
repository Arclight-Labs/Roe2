import { useLive } from "utils/hooks"

type TeamSide = "teamA" | "teamB"
type UseInverse = () => (teamSide: TeamSide) => TeamSide

export const useInverse: UseInverse = () => {
  const { invert } = useLive()
  return (teamSide) => {
    const isTeamA = teamSide === "teamA"

    if (invert) {
      if (isTeamA) return "teamB"
      return "teamA"
    }
    if (isTeamA) return "teamA"
    return "teamB"
  }
}
