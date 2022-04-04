import { Button } from "@mantine/core"
import React from "react"
import { useAppDispatch, useAppSelector } from "utils/hooks"
import { set as setAction } from "utils/redux/slice/tournament"

const TextComponent = () => {
  return (
    <div>
      <Button>test</Button>
    </div>
  )
}

export default TextComponent
