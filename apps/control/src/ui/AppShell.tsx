import { AppShell as Shell, AppShellProps } from "@mantine/core"
import { FC } from "react"
import Navbar from "./Navbar"

interface Props extends AppShellProps {
  version: string
}
const AppShell: FC<Props> = ({ children, version, ...props }) => {
  return (
    <Shell
      {...props}
      navbar={<Navbar version={version} />}
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
