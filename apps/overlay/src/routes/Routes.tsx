import { FunctionComponent, lazy, Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

function Loadable<T extends object = {}>(Component: FunctionComponent<T>) {
  return (props: T) => {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    )
  }
}

const Logo = Loadable(lazy(() => import("../views/team/Logo.o")))
const TeamName = Loadable(lazy(() => import("../views/team/TeamName.o")))
const Talent = Loadable(lazy(() => import("../views/talent/Talent.o")))

const Routes = () => {
  return useRoutes([
    {
      path: "/:roomId",
      children: [
        {
          path: "talent",
          children: [
            {
              path: ":talentUID",
              element: <Talent />,
            },
          ],
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
