import { AspectRatio, AspectRatioProps, Box } from "@mantine/core"
import bg from "./logo_bg.png"

interface Props extends Omit<AspectRatioProps, "ratio"> {
  logo?: string
}
const MatchTeamLogo = ({ logo, ...props }: Props) => {
  const logoOrTBD = logo || ""
  return (
    <AspectRatio
      ratio={163 / 134}
      {...props}
      sx={{ position: "relative", width: 163, ...props.sx }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          zIndex: 10,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("${bg}")`,
        }}
      />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          zIndex: 20,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("${logoOrTBD}")`,
        }}
      />
    </AspectRatio>
  )
}

export default MatchTeamLogo
