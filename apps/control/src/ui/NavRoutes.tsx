import {
  Ad,
  Aperture,
  DeviceGamepad,
  GitFork,
  Headset,
  Icon,
  Settings,
  Speakerphone,
  Tournament,
  Users,
} from "tabler-icons-react"
interface NavLink {
  link: string
  label: string
  icon: Icon
}

const routes: NavLink[] = [
  { link: "/tournaments", label: "Tournament", icon: Tournament },
  { link: "/participants", label: "Participants", icon: Users },
  { link: "/matches", label: "Matches", icon: GitFork },
  { link: "/talents", label: "Talents", icon: Headset },
  { link: "/lowerthirds", label: "Lower Thirds", icon: Ad },
  { link: "/ingame", label: "Ingame", icon: DeviceGamepad },
  { link: "/state", label: "State", icon: Settings },
  { link: "/shoutouts", label: "Shoutouts", icon: Speakerphone },
  { link: "/obs", label: "OBS Integration", icon: Aperture },
  // { link: "/overlays", label: "Overlays", icon: Polaroid },
]

export default routes
