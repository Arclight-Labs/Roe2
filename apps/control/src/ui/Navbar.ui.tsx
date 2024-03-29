import {
  Code,
  createStyles,
  Group,
  MediaQuery,
  Navbar,
  Stack,
} from "@mantine/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import routes from "./NavRoutes"
import RoomButton from "./room/RoomButton.ui"
import UserButton from "./user/UserButton.ui"

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
  const { classes, cx } = useStyles()
  const [active, setActive] = useState("Billing")

  const links = routes.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label)
      }}
    >
      <MediaQuery smallerThan="sm" styles={{ marginRight: 0 }}>
        <item.icon className={classes.linkIcon} />
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <span>{item.label}</span>
      </MediaQuery>
    </Link>
  ))

  return (
    <Navbar
      height="100vh"
      width={{ base: 80, sm: 300 }}
      p="md"
      sx={{ overflow: "auto" }}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* <MantineLogo /> */}
          <Code sx={{ fontWeight: 700 }}>{version}</Code>
        </Group>
        <Stack spacing={0}>{links}</Stack>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {/* <OBSConnection variant="button" /> */}
        <RoomButton />
        <UserButton />
      </Navbar.Section>
    </Navbar>
  )
}

export default NavbarSimple
