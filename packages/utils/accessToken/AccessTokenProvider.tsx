import React, { FC, PropsWithChildren, useState } from "react"
import { accessTokenContext, accessTokenDispatch } from "./AccessToken.context"

const AccessTokenProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [accessToken, setAccessToken] = useState("")

  return (
    <accessTokenContext.Provider value={accessToken}>
      <accessTokenDispatch.Provider value={setAccessToken}>
        {children}
      </accessTokenDispatch.Provider>
    </accessTokenContext.Provider>
  )
}

export default AccessTokenProvider
