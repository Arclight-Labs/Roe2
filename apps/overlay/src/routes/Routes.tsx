import { FunctionComponent, lazy, Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import Schedules from "../views/schedule/Schedules.o"

function Loadable<T extends object = {}>(Component: FunctionComponent<T>) {
  return (props: T) => {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    )
  }
}

const UpNext = Loadable(lazy(() => import("../views/upnext/UpNext.o")))
const Logo = Loadable(lazy(() => import("../views/team/Logo.o")))
const TeamName = Loadable(lazy(() => import("../views/team/TeamName.o")))
const Talent = Loadable(lazy(() => import("../views/talent/Talent.o")))
const Player = Loadable(lazy(() => import("../views/player/Player.o")))

const Routes = () => {
  return useRoutes([
    {
      path: "/:roomId",
      children: [
        {
          path: "talent",
          children: [
            {
              path: ":talent",
              element: <Talent />,
            },
          ],
        },
        {
          path: "upnext",
          element: <UpNext />,
        },
        {
          path: "schedules",
          element: <Schedules />,
        },
        {
          path: "team",
          children: [
            {
              path: ":team",
              children: [
                {
                  path: "logo",
                  element: <Logo />,
                },
                {
                  path: "player",
                  children: [
                    {
                      path: ":player",
                      element: <Player />,
                    },
                  ],
                },
                {
                  path: ":name",
                  element: <TeamName />,
                },
              ],
            },
          ],
        },
      ],
    },
  ])
}
export default Routes
