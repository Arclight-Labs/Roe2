import { LoadingOverlay } from "@mantine/core"
import { FunctionComponent, lazy, Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import BSaveProvider from "../context/bsave/bsave.provider"
import RoomProvider from "../context/room/Room.provider"
import Shoutouts from "../pages/shoutouts"
import StatePage from "../pages/state/State.page"
import AppShellWrapper from "../ui/AppShellWrapper.ui"
import AuthGuard from "../ui/guards/AuthGuard"
import RoomGuard from "../ui/guards/RoomGuard"
import LiveDrawer from "../ui/live/LiveDrawer.ui"
import RoomSelect from "../ui/RoomSelect.ui"

const Login = Loadable(lazy(() => import("../pages/Login.page")))
const SignUp = Loadable(lazy(() => import("../pages/SignUp.page")))
const TournamentPage = Loadable(lazy(() => import("../pages/tournament")))
const ParticipantsPage = Loadable(lazy(() => import("../pages/participants")))
const MatchesPage = Loadable(lazy(() => import("../pages/matches")))
const TalentsPage = Loadable(lazy(() => import("../pages/talents")))
const LowerthirdsPage = Loadable(lazy(() => import("../pages/lowerthirds")))
const IngamePage = Loadable(lazy(() => import("../pages/ingame")))
const ShoutoutsPage = Loadable(lazy(() => import("../pages/shoutouts")))
const OverlaysPage = Loadable(lazy(() => import("../pages/overlays")))
const ObsPage = Loadable(lazy(() => import("../pages/obs")))

const QuickSettingsPage = Loadable(
  lazy(() => import("../pages/quick_settings"))
)

function Loadable<T extends object = {}>(Component: FunctionComponent<T>) {
  return (props: T) => {
    return (
      <Suspense fallback={<LoadingOverlay visible />}>
        <Component {...props} />
      </Suspense>
    )
  }
}

const Routes = () => {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "quick-settings",
      element: (
        <AuthGuard>
          <RoomProvider hideSidebar>
            <BSaveProvider>
              <QuickSettingsPage />
            </BSaveProvider>
          </RoomProvider>
        </AuthGuard>
      ),
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <RoomGuard>
            <BSaveProvider>
              <AppShellWrapper>
                <Outlet />
                <LiveDrawer />
              </AppShellWrapper>
            </BSaveProvider>
          </RoomGuard>
        </AuthGuard>
      ),
      children: [
        { path: "rooms", element: <RoomSelect /> },
        { path: "/", element: <Navigate to="tournaments" /> },
        { path: "tournaments", element: <TournamentPage /> },
        { path: "participants", element: <ParticipantsPage /> },
        { path: "matches", element: <MatchesPage /> },
        { path: "talents", element: <TalentsPage /> },
        { path: "lowerthirds", element: <LowerthirdsPage /> },
        { path: "ingame", element: <IngamePage /> },
        { path: "state", element: <StatePage /> },
        { path: "shoutouts", element: <Shoutouts /> },
        { path: "obs", element: <ObsPage /> },
        // { path: "overlays", element: <OverlaysPage /> },
      ],
    },
  ])
}
export default Routes
