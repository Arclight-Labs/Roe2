import { LoadingOverlay } from "@mantine/core"
import { lazy } from "react"
import { FunctionComponent, Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import RoomSelect from "../ui/RoomSelect.ui"
import AppShellWrapper from "../ui/AppShellWrapper.ui"
import AuthGuard from "../ui/guards/AuthGuard"
import RoomGuard from "../ui/guards/RoomGuard"

const Login = Loadable(lazy(() => import("../pages/Login.page")))
const SignUp = Loadable(lazy(() => import("../pages/SignUp.page")))
const TournamentPage = Loadable(lazy(() => import("../pages/tournament")))
const ParticipantsPage = Loadable(lazy(() => import("../pages/participants")))
const MatchesPage = Loadable(lazy(() => import("../pages/matches")))

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
      path: "/",
      element: (
        <AuthGuard>
          <RoomGuard>
            <AppShellWrapper>
              <Outlet />
            </AppShellWrapper>
          </RoomGuard>
        </AuthGuard>
      ),
      children: [
        { path: "rooms", element: <RoomSelect /> },
        { path: "/", element: <Navigate to="tournaments" /> },
        { path: "tournaments", element: <TournamentPage /> },
        { path: "participants", element: <ParticipantsPage /> },
        { path: "matches", element: <MatchesPage /> },
      ],
    },
  ])
}
export default Routes
