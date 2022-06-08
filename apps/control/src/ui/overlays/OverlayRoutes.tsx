import { Tournament, Icon } from "tabler-icons-react"

interface OverlayAdjustables {
  adjText: boolean
  record: boolean
}
export interface OverlayLink {
  link: string
  label: string
  icon: string
  adjust?: Partial<OverlayLink> & Partial<OverlayAdjustables>
  team?: "a" | "b"
  teamCode?: "shortcode" | "name" | "shortname" | "schoolShortcode" | "school"
  playerCode?: "photoURL" | "username" | "school"
  statIndex?: number
  index?: number
}

const OverlayRoutes = ({
  team,
  teamCode,
  playerCode,
  statIndex,
  index,
}: Partial<OverlayLink>) => {
  const OverlayLinks: Record<string, OverlayLink> = {
    Shoutout: {
      link: "/shoutout",
      label: "Shoutout",
      icon: "🔊",
    },
    UpNext: {
      link: "/upnext",
      label: "Up Next",
      icon: "⏭",
    },
    Schedules: {
      link: "/schedules",
      label: "Schedules",
      icon: "📆",
    },
    LT: {
      link: "/lowerthirds",
      label: "Lower Thirds",
      icon: "📪",
    },
    Talent: {
      link: `/talent/${index}`,
      label: "Talents",
      icon: "🙋‍♂️",
      adjust: { index: index },
    },
    TeamLogo: {
      link: `/team/${team}/logo`,
      label: "Team Logo",
      icon: "🛂",
      adjust: { team: team },
    },
    TeamName: {
      link: `/team/${team}/${teamCode}`,
      label: "Team Names",
      icon: "🔠",
      adjust: {
        team: team,
        teamCode: teamCode,
        adjText: true,
      },
    },
    TeamScore: {
      link: `/team/${team}/score`,
      label: "Team Score",
      icon: "🔢",
      adjust: { team: team, adjText: true },
    },
    Player: {
      link: `/team/${team}/player/${index}/${playerCode}`,
      label: "Player",
      icon: "🦸‍♂️",
      adjust: {
        team: team,
        index: index,
        playerCode: playerCode,
        adjText: true,
      },
    },
    PlayerStats: {
      link: `/team/${team}/player/${index}/stats/${statIndex}`,
      label: "Player Stats",
      icon: "👨‍💻",
      adjust: {
        team: team,
        index: index,
        statIndex: statIndex,
        adjText: true,
        record: true,
      },
    },
  }

  return OverlayLinks
}

export default OverlayRoutes
