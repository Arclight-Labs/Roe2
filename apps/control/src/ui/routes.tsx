import { ReactNode } from "react"
import {
  Tournament,
  Icon,
  Users,
  GitFork,
  Headset,
  Ad,
  DeviceGamepad,
  Settings,
} from "tabler-icons-react"
interface NavLink {
  link: string
  label: string
  icon: Icon
}

const routes: NavLink[] = [
  { link: "", label: "Tournament", icon: Tournament },
  { link: "", label: "Participants", icon: Users },
  { link: "", label: "Matches", icon: GitFork },
  { link: "", label: "Talents", icon: Headset },
  { link: "", label: "Lower Thirds", icon: Ad },
  { link: "", label: "Ingame", icon: DeviceGamepad },
  { link: "", label: "State", icon: Settings },
]

export default routes
