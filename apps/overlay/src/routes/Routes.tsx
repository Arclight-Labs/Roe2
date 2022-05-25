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
const Versus = Loadable(lazy(() => import("../views/versus/Versus.o")))
const Score = Loadable(lazy(() => import("../views/team/Score.o")))
const ShoutoutsSlide = Loadable(
  lazy(() => import("../views/shoutouts/Shoutouts.slides.o"))
)
const Shoutout = Loadable(lazy(() => import("../views/shoutouts/Shoutout.o")))

const LowerThirds = Loadable(
  lazy(() => import("../views/lowerthirds/LowerThirds.o"))
)
const Ticker = Loadable(
  lazy(() => import("../views/lowerthirds/LowerTicker.o"))
)

const Routes = () => {
  return useRoutes([
    {
      path: "/:roomId",
      children: [
        {
          path: "shoutouts",
          element: <ShoutoutsSlide />,
        },
        {
          path: "shoutout",
          element: <Shoutout />,
        },
        {
          path: "lowerthirds",
          element: <LowerThirds />,
        },
        {
          path: "ticker",
          element: <Ticker />,
        },
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
                      children: [
                        {
                          path: ":code",
                          element: <Player />,
                        },
                      ],
                    },
                  ],
                },
                {
                  path: "versus",
                  children: [
                    {
                      path: ":versus",
                      element: <Versus />,
                    },
                  ],
                },

                {
                  path: ":name",
                  element: <TeamName />,
                },
                {
                  path: "score",
                  element: <Score />,
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
