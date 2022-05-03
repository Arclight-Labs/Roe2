import { useState } from "react"
import { createStyles, Navbar, Group, Code } from "@mantine/core"
import routes from "./routes"
import { Text } from "@mantine/core"
import { signOut } from "firebase/auth"
import { auth } from "utils/firebase"
import { useAuth } from "../context/auth/Auth.hooks"
import UserButton from "../comps/UserButton.component"
// import {
//   BellRinging,
//   Fingerprint,
//   Key,
//   Settings,
//   TwoFA,
//   DatabaseImport,
//   Receipt2,
//   SwitchHorizontal,
//   Logout,
// } from 'tabler-icons-react';
// import { MantineLogo } from '../../shared/MantineLogo';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon")
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === "dark"
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 5 : 7
            ],
        },
      },
    },
  }
})

interface Props {
  version: string
}
export function NavbarSimple({ version }: Props) {
  const { user } = useAuth()
  const { classes, cx } = useStyles()
  const [active, setActive] = useState("Billing")

  const links = routes.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* <MantineLogo /> */}
          <Code sx={{ fontWeight: 700 }}>{version}</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton />

        {/* <Text className={classes.link}>test</Text>

        <Text className={classes.link} onClick={() => {}}>
          <span>Leave Room</span>
        </Text>

        <Text className={classes.link} onClick={() => signOut(auth)}>
          <span>Logout</span>
        </Text> */}
      </Navbar.Section>
    </Navbar>
  )
}

export default NavbarSimple
