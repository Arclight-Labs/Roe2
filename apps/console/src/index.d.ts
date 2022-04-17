import { ReactNode } from "react"

/**
 * We are overriding this due to React18 changes
 * issue: https://github.com/tannerlinsley/react-query/issues/3476#issuecomment-1092424508
 */
declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: ReactNode
  }
}
