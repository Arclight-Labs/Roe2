import type { AxiosResponse } from "axios"
import { Err } from "../../utils"
import { CustomProvider, customProvidersMetadata } from "../custom_providers"
import { OAuthRequest, Tokens } from "../defs/tokens"

type RequestToken = <T extends OAuthRequest = OAuthRequest>(
  provider: CustomProvider,
  request: T
) => Promise<Tokens>

export const requestToken: RequestToken = async (provider, data) => {
  const encodedData = new URLSearchParams(Object.entries(data)).toString()
  const headers = { "Content-Type": "application/x-www-form-urlencoded" }
  const config = { headers }
  const { default: axios } = await import("axios")
  const { tokenUri, baseUri } = customProvidersMetadata[provider]
  const path = baseUri + tokenUri
  return axios
    .post<string, AxiosResponse<Tokens>>(path, encodedData, config)
    .then((result) => result.data)
    .catch((e) => {
      const msg = `Failed to request token from ${provider}`
      throw new Err("aborted", msg, e)
    })
}
