import { functions } from "../admin"

interface Config {
  twitter: {
    bearer: string
  }
}

export const cfConfig = (): Config => {
  return functions.config() as Config
}
