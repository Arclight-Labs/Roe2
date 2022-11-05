import {
  Ad,
  GitFork,
  Headset,
  Icon,
  ListDetails,
  Polaroid,
  Settings,
  Speakerphone,
  Users,
} from "tabler-icons-react"
interface NavLink {
  link: string
  label: string
  icon: Icon
}

const routes: NavLink[] = [
  // { link: "/tournaments", label: "Tournament", icon: Tournament },
  { link: "/participants", label: "Participants", icon: Users },
  { link: "/matches", label: "Matches", icon: GitFork },
  { link: "/talents", label: "Talents", icon: Headset },
  { link: "/lowerthirds", label: "Lower Thirds", icon: Ad },
  // { link: "/ingame", label: "Ingame", icon: DeviceGamepad },
  { link: "/state", label: "State", icon: Settings },
  { link: "/shoutouts", label: "Shoutouts", icon: Speakerphone },
  // { link: "/obs", label: "OBS Integration", icon: Aperture },
  { link: "/overlays", label: "Overlays", icon: Polaroid },
  { link: "/rundown", label: "Rundown", icon: ListDetails },
]

export default routes
