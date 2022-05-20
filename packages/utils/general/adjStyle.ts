import { CSSProperties } from "react"
import { AdjImage, AdjSize } from "interface/ws/Live.interface"

type AdjImageStyles = (
  image: AdjImage,
  defaultStyles?: AdjSize
) => { style: Partial<CSSProperties> }

export const adjImageStyles: AdjImageStyles = (
  img,
  defaultStyles = { h: 100, w: 200, scale: 0, x: 0, y: 0 }
) => {
  const adj = img.adj
  const x = adj.x || defaultStyles.x,
    y = adj.y || defaultStyles.y,
    h = adj.h || defaultStyles.h,
    w = adj.w || defaultStyles.w,
    scale = adj.scale || defaultStyles.scale

  const style: CSSProperties = {
    height: h,
    width: w,
    transform: `translateX(${x}px) translateY(${y}px) scale(${scale + 1})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${img.BASE64 || img.URL})`,
  }

  return { style }
}
