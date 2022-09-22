import { cfConfig } from "./config"

export const twitterAxios = async () => {
  const { default: axios } = await import("axios")

  return axios.create({
    baseURL: "https://api.twitter.com/2",
    headers: {
      Authorization: `Bearer ${cfConfig().twitter.bearer}`,
    },
  })
}
