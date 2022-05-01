import { LoadingOverlay } from "@mantine/core"
import { lazy } from "react"
import { FunctionComponent, Suspense } from "react"
import { useRoutes } from "react-router-dom"
import TextComponent from "../pages/TextComponent"
import AppShell from "../ui/AppShell"
import AuthGuard from "../ui/guards/AuthGuard"

const Login = Loadable(lazy(() => import("../pages/Login")))
const SignUp = Loadable(lazy(() => import("../pages/SignUp")))

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
          <AppShell version={import.meta.env.PACKAGE_VERSION}>
            <TextComponent />
          </AppShell>
        </AuthGuard>
      ),
    },
  ])
}
export default Routes
