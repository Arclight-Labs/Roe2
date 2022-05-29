import { AdjImage, AdjSize } from "interface/ws/Live.interface"
import { Sx } from "@mantine/styles"

type AdjImageStyles = (image: AdjImage, defaultStyles?: AdjSize) => Partial<Sx>

export const adjImageStyles: AdjImageStyles = (
  img,
  defaultStyles = { h: 0, w: 0, scale: 0, x: 0, y: 0 }
) => {
  const adj = img.adj,
    x = adj.x || defaultStyles.x,
    y = adj.y || defaultStyles.y,
    h = adj.h || defaultStyles.h,
    w = adj.w || defaultStyles.w,
    scale = adj.scale || defaultStyles.scale

  const style: Sx = {
    height: h,
    width: w,
    transform: `translateX(${x}px) translateY(${y}px) scale(${scale + 1})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url("${img.BASE64 || img.URL}")`,
  }

  if (!h) delete style.height
  if (!w) delete style.width

  return style
}
