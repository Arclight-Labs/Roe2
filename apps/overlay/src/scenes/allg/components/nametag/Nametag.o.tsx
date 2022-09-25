import { Box, Stack, Sx } from "@mantine/core"
import { useParams } from "react-router-dom"
import { defaultTalent } from "utils/general"
import { useLive } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import { useParamsCss } from "../../../../hooks/useParamsCss"
import Headline from "../text/Headline.ui"
import Subtext from "../text/Subtext.ui"
import bg from "./nametag.png"

type Params = { index: string }

const Nametag = () => {
  useParamRoom()
  const { index = "" } = useParams<Params>()
  const { getActiveTalent } = useLive()
  const i = parseInt(index) - 1
  const css = useParamsCss()
  const talent = getActiveTalent(i) || defaultTalent
  return (
    <Box
      sx={{
        height: 160,
        width: 492,
        backgroundImage: `url("${bg}")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack
        spacing={0}
        px={20}
        pb={5}
        sx={{
          justifyContent: "center",
          height: 80,
          width: 430,
          transform: "translate(40px, 33px) rotate(-9.5deg)",
        }}
      >
        <Headline
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 50,
            letterSpacing: "4px",
            lineHeight: 1,
            ...(css as Sx),
          }}
        >
          {talent.username}
        </Headline>
        {talent.socialHandle && (
          <Subtext sx={{ fontSize: 20 }}>@{talent.socialHandle}</Subtext>
        )}
      </Stack>
    </Box>
  )
}

export default Nametag
