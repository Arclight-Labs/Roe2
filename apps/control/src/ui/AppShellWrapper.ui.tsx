import { PropsWithChildren } from "react"
import AppShell from "./AppShell.ui"

const AppShellWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AppShell
      version={`${import.meta.env.PACKAGE_VERSION}${
        import.meta.env.DEV ? " Emulated" : ""
      }`}
    >
      {children}
    </AppShell>
  )
}

export default AppShellWrapper
