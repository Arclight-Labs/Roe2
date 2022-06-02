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
  adjust: boolean
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
      adjust: false,
    },
    UpNext: {
      link: "/upnext",
      label: "Up Next",
      icon: Tournament,
      adjust: false,
    },
    Schedules: {
      link: "/schedules",
      label: "Schedules",
      icon: Tournament,
      adjust: false,
    },
    LT: {
      link: "/lowerthirds",
      label: "Lower Thirds",
      icon: Tournament,
      adjust: false,
    },
    Talent: {
      link: `/talent/${index}`,
      label: "Talents",
      icon: Tournament,
      adjust: false,
    },
    TeamLogo: {
      link: `/team/${team}/logo`,
      label: "Team Logo",
      icon: Tournament,
      adjust: false,
    },
    TeamName: {
      link: `/team/${team}/${teamCode}`,
      label: "Team Names",
      icon: Tournament,
      adjust: true,
    },
    TeamScore: {
      link: `/team/${team}/score`,
      label: "Team Score",
      icon: Tournament,
      adjust: true,
    },
    Player: {
      link: `/team/${team}/player/${index}/${playerCode}`,
      label: "Player",
      icon: Tournament,
      adjust: true,
    },
    PlayerStats: {
      link: `/team/${team}/player/${index}/stats/${statIndex}`,
      label: "Player Stats",
      icon: Tournament,
      adjust: true,
    },
  }

  return OverlayLinks
}

export default OverlayRoutes
