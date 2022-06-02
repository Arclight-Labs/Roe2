import {
  Tournament,
  Icon,
  Users,
  GitFork,
  Headset,
  Ad,
  DeviceGamepad,
  Settings,
  Speakerphone,
  Polaroid,
} from "tabler-icons-react"

export interface OverlayLink {
  link: string
  label: string
  icon: Icon
  adjust?: Partial<OverlayLink>
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
      icon: Tournament,
    },
    UpNext: {
      link: "/upnext",
      label: "Up Next",
      icon: Tournament,
    },
    Schedules: {
      link: "/schedules",
      label: "Schedules",
      icon: Tournament,
    },
    LT: {
      link: "/lowerthirds",
      label: "Lower Thirds",
      icon: Tournament,
    },
    Talent: {
      link: `/talent/${index}`,
      label: "Talents",
      icon: Tournament,
      adjust: { index: index },
    },
    TeamLogo: {
      link: `/team/${team}/logo`,
      label: "Team Logo",
      icon: Tournament,
      adjust: { team: team },
    },
    TeamName: {
      link: `/team/${team}/${teamCode}`,
      label: "Team Names",
      icon: Tournament,
      adjust: { team: team, teamCode: teamCode },
    },
    TeamScore: {
      link: `/team/${team}/score`,
      label: "Team Score",
      icon: Tournament,
      adjust: { team: team },
    },
    Player: {
      link: `/team/${team}/player/${index}/${playerCode}`,
      label: "Player",
      icon: Tournament,
      adjust: { team: team, index: index, playerCode: playerCode },
    },
    PlayerStats: {
      link: `/team/${team}/player/${index}/stats/${statIndex}`,
      label: "Player Stats",
      icon: Tournament,
      adjust: { team: team, index: index, statIndex: statIndex },
    },
  }

  return OverlayLinks
}

export default OverlayRoutes
