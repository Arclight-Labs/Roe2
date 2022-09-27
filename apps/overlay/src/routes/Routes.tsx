import { FunctionComponent, lazy, Suspense } from "react"
import { Outlet, useRoutes } from "react-router-dom"
import Scene from "ui/Scene"
import { SubwayPropBerlin } from "../fonts/SubwayProBerlin/Subway.font"
import { TabletGothic } from "../fonts/TabletGothic/Tablet.font"

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
const Schedules = Loadable(lazy(() => import("../views/schedule/Schedules.o")))
const NextSchedule = Loadable(
  lazy(() => import("../views/nextschedule/NextSchedule.o"))
)
const Logo = Loadable(lazy(() => import("../views/team/Logo.o")))
const TeamName = Loadable(lazy(() => import("../views/team/TeamName.o")))
const Talent = Loadable(lazy(() => import("../views/talent/Talent.o")))
const Player = Loadable(lazy(() => import("../views/player/Player.o")))
const PlayerStats = Loadable(
  lazy(() => import("../views/player/PlayerStats.o"))
)
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
const AdSingle = Loadable(lazy(() => import("../views/lowerthirds/AdSingle.o")))
const AdPool = Loadable(lazy(() => import("../views/lowerthirds/AdPool.o")))
const Playground = Loadable(lazy(() => import("../views/Playground")))

// ------------- SCENES
const ValorantIngameScene = Loadable(
  lazy(() => import("../scenes/allg/ingame/val/Val.ingame.scene"))
)
const CodmIngameScene = Loadable(
  lazy(() => import("../scenes/allg/ingame/codm/Codm.ingame.scene"))
)
const MlbbIngameScene = Loadable(
  lazy(() => import("../scenes/allg/ingame/mlbb/Mlbb.ingame.scene"))
)
const HeadToHead = Loadable(
  lazy(() => import("../scenes/allg/headToHead/h2h.scene"))
)

// ------------- COMPONENTS
const TeamCard = Loadable(
  lazy(() => import("../scenes/allg/components/team_card/TeamCard.o"))
)
const Nametag = Loadable(
  lazy(() => import("../scenes/allg/components/nametag/Nametag.o"))
)

const Routes = () => {
  return useRoutes([
    {
      path: "/:roomId",
      children: [
        {
          path: "o",
          children: [
            {
              path: "allg",
              element: (
                <Scene>
                  <Outlet />
                  <SubwayPropBerlin />
                  <TabletGothic />
                </Scene>
              ),
              children: [
                {
                  path: "ingame",
                  children: [
                    { path: "val", element: <ValorantIngameScene /> },
                    { path: "codm", element: <CodmIngameScene /> },
                    { path: "mlbb", element: <MlbbIngameScene /> },
                  ],
                },
                {
                  path: "headToHead",
                  element: <HeadToHead />,
                },
                {
                  path: "c",
                  children: [
                    {
                      path: "nametag/:index",
                      element: <Nametag />,
                    },
                    {},
                    {
                      path: "team",
                      children: [
                        { path: "a", element: <TeamCard side="teamA" /> },
                        { path: "b", element: <TeamCard side="teamB" /> },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "playground",
          element: <Playground />,
        },
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
          path: "adsingle",
          element: <AdSingle />,
        },
        {
          path: "adpool",
          element: <AdPool />,
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
          path: "nextschedule",
          element: <NextSchedule />,
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
                        {
                          path: "stats",
                          children: [
                            {
                              path: ":stats",
                              element: <PlayerStats />,
                            },
                          ],
                        },
                      ],
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
