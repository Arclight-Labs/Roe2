import { LoadingOverlay } from "@mantine/core"
import { FunctionComponent, lazy, Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { ParamRoomProvider } from "utils/hooks/useParamRoom.hook"

// Lazy Loaded Components
const RoomProvider = Loadable(
  lazy(() => import("../context/room/Room.provider"))
)
const AppShellWrapper = Loadable(lazy(() => import("../ui/AppShellWrapper.ui")))
const AuthGuard = Loadable(lazy(() => import("../ui/guards/AuthGuard")))
const RoomGuard = Loadable(lazy(() => import("../ui/guards/RoomGuard")))
const LiveDrawer = Loadable(lazy(() => import("../ui/live/LiveDrawer.ui")))
const RoomSelect = Loadable(lazy(() => import("../ui/RoomSelect.ui")))

// Lazy Loaded Pages
const Login = Loadable(lazy(() => import("../pages/Login.page")))
const SignUp = Loadable(lazy(() => import("../pages/SignUp.page")))
// const TournamentPage = Loadable(lazy(() => import("../pages/tournament")))
const ParticipantsPage = Loadable(lazy(() => import("../pages/participants")))
const MatchesPage = Loadable(lazy(() => import("../pages/matches")))
const TalentsPage = Loadable(lazy(() => import("../pages/talents")))
const LowerthirdsPage = Loadable(lazy(() => import("../pages/lowerthirds")))
const IngamePage = Loadable(lazy(() => import("../pages/ingame")))
const ShoutoutsPage = Loadable(lazy(() => import("../pages/shoutouts")))
const OverlaysPage = Loadable(lazy(() => import("../pages/overlays")))
const ObsPage = Loadable(lazy(() => import("../pages/obs")))
const StatePage = Loadable(lazy(() => import("../pages/state/State.page")))
const QuickSettingsPage = Loadable(
  lazy(() => import("../pages/quick_settings"))
)
const VetoPage = Loadable(lazy(() => import("../pages/veto")))
const RundownPage = Loadable(lazy(() => import("../pages/rundown")))
const RundownItemPage = Loadable(
  lazy(() => import("../pages/rundown/RundownItem.page"))
)
const RundownViewPage = Loadable(lazy(() => import("../pages/rundown_view")))

function Loadable<T extends object>(Component: FunctionComponent<T>) {
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
      path: "veto/:roomId/:seriesId",
      element: (
        <ParamRoomProvider>
          <VetoPage />
        </ParamRoomProvider>
      ),
    },
    {
      path: "rundown/:rundownId",
      element: <RundownViewPage />,
    },
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
            <QuickSettingsPage />
          </RoomProvider>
        </AuthGuard>
      ),
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <RoomGuard>
            <AppShellWrapper>
              <Outlet />
              <LiveDrawer />
            </AppShellWrapper>
          </RoomGuard>
        </AuthGuard>
      ),
      children: [
        { path: "rooms", element: <RoomSelect /> },
        { path: "/", element: <Navigate to="participants" /> },
        // { path: "tournaments", element: <TournamentPage /> },
        { path: "participants", element: <ParticipantsPage /> },
        { path: "matches", element: <MatchesPage /> },
        { path: "talents", element: <TalentsPage /> },
        { path: "lowerthirds", element: <LowerthirdsPage /> },
        { path: "ingame", element: <IngamePage /> },
        { path: "state", element: <StatePage /> },
        { path: "shoutouts", element: <ShoutoutsPage /> },
        { path: "obs", element: <ObsPage /> },
        { path: "overlays", element: <OverlaysPage /> },
        { path: "rundown", element: <RundownPage /> },
        { path: "rundown/:rundownId/edit", element: <RundownItemPage /> },
      ],
    },
  ])
}
export default Routes
