import { FunctionComponent, PropsWithChildren } from "react"
import ax from "utils/api/axios"
import { axios } from "./axios.context"

export const withAxios = <T extends Object>(
  Component: FunctionComponent<PropsWithChildren<T>>
) => {
  return (props: PropsWithChildren<T>) => {
    return (
      <axios.Provider value={ax(window.location.hostname)}>
        <Component {...props} />
      </axios.Provider>
    )
  }
}
