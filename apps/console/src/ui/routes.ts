import { ReactNode } from "react"

interface NavLink {
  link: string
  label: string
  icon: ReactNode
}

const routes: NavLink[] = [
  { link: "", label: "Tournament", icon: "" },
  { link: "", label: "Participants", icon: "" },
  { link: "", label: "Matches", icon: "" },
  { link: "", label: "Talents", icon: "" },
  { link: "", label: "Lower Thirds", icon: "" },
  { link: "", label: "Ingame", icon: "" },
  { link: "", label: "State", icon: "" },
]

export default routes
