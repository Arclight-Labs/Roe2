import { AppShell as Shell, AppShellProps } from "@mantine/core"
import { FC } from "react"
import Navbar from "./Navbar"
const AppShell: FC<AppShellProps> = ({ children, ...props }) => {
  return (
    <Shell
      {...props}
      navbar={<Navbar />}
      sx={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: "100vh",
          width: "100vw",
        },
      })}
    >
      {children}
    </Shell>
  )
}

export default AppShell
