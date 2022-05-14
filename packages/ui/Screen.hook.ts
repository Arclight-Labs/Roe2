import { useMediaQuery } from "@mantine/hooks"

export const useScreen = () => {
  const xs = useMediaQuery("(min-width: 576px)")
  const sm = useMediaQuery("(min-width: 768px)")
  const md = useMediaQuery("(min-width: 992px)")
  const lg = useMediaQuery("(min-width: 1200px)")
  const xl = useMediaQuery("(min-width: 1400px)")
  const dialog = useMediaQuery("(min-width: 510px)")
  const mobile = useMediaQuery("(min-width: 0)")
  const tablet = useMediaQuery("(min-width: 768px)")
  const laptop = useMediaQuery("(min-width: 1200px)")
  const desktop = useMediaQuery("(min-width: 1200px)")

  return { xs, sm, md, lg, xl, mobile, dialog, tablet, laptop, desktop }
}
