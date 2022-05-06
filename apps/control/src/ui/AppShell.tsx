import {
  AppShell as Shell,
  AppShellProps,
  Stack,
  Container,
} from "@mantine/core"
import { FC } from "react"
import {} from "tabler-icons-react"
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
          maxHeight: "100%",
        },
      })}
      padding={0}
    >
      <Stack
        p="xl"
        sx={{ maxHeight: "100%", maxWidth: "100%", overflow: "auto" }}
      >
        {children}
      </Stack>
    </Shell>
  )
}

export default AppShell
