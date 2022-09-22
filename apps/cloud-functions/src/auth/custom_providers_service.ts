import type { AxiosRequestConfig, AxiosResponse } from "axios"
import {
  FieldValue,
  QueryDocumentSnapshot,
  WriteBatch,
} from "firebase-admin/firestore"
import { User } from "interface"
import { getDB } from "../firesbase-admin"
import { Err, snakeToCamel } from "../utils"
import doc from "../utils/fsDoc"
import getOne from "../utils/fsGetOne"
import getQ from "../utils/fsGetQ"
import { CustomProvider, customProvidersMetadata } from "./custom_providers"
import type { OAuthRequest, Tokens } from "./defs/tokens"

type Uid = { uid: string }

type Params = [provider: CustomProvider, id: string]
type GetCustomProviderUserInfo = (
  ...args: Params
) => Promise<QueryDocumentSnapshot<Uid>>
type ValidateOAuthNotTaken = (...args: Params) => Promise<boolean>

type RequestToken = <T extends OAuthRequest = OAuthRequest>(
  provider: CustomProvider,
  request: T
) => Promise<Tokens>

type AuthHeaders = (tokens: Tokens) => AxiosRequestConfig
type WriteInfoParams<T> = [
  uid: string,
  tokens: Tokens,
  userData: { id: string } & T,
  provider: CustomProvider,
  userInfo?: Partial<User>
]

type WriteInfo = <T>(...args: WriteInfoParams<T>) => WriteBatch
type DisconnectProvider = (
  uid: string,
  provider: CustomProvider
) => Promise<WriteBatch>

export const getCustomProviderUserInfo: GetCustomProviderUserInfo = async (
  provider,
  id
) => {
  const { path } = customProvidersMetadata[provider]
  return getOne<Uid>(path, id)
}

/**
 * Check if user is already taken, throw already-exists error
 */
export const validateOAuthNotTaken: ValidateOAuthNotTaken = async (
  provider,
  id
) => {
  return getCustomProviderUserInfo(provider, id)
    .then((user) => {
      if (user.exists) {
        const msg = `${provider} already linked`
        throw new Err("already-exists", msg)
      }

      return true
    })
    .catch((e) => {
      const msg = "Unable to get provider details"
      throw new Err("aborted", msg, e)
    })
}

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
      const msg = "Unable to establish connection."
      throw new Err("aborted", msg, e)
    })
}

export const authHeaders: AuthHeaders = ({ token_type, access_token }) => ({
  headers: {
    Authorization: `${token_type} ${access_token}`,
    "Content-Type": "application/json",
  },
})

export const writeInfo: WriteInfo = (
  uid,
  tokens,
  userData,
  provider,
  userInfo
) => {
  const db = getDB()
  type T = typeof userData

  const ref = doc<User>(`users/${uid}`)

  const associatedUserRef = doc<Uid>(
    customProvidersMetadata[provider].path,
    userData.id
  )

  const connectionReference = doc<Uid & T>(ref.path, "connections", provider)

  const batch = db.batch()
  const data = snakeToCamel({ ...tokens, ...userData }) as T & Tokens

  batch.set(ref, { ...userInfo, [provider]: userData }, { merge: true })
  batch.set(connectionReference, { ...data, uid }, { merge: true })
  batch.set(associatedUserRef, { uid })
  return batch
}

export const disconnectProvider: DisconnectProvider = async (uid, provider) => {
  const db = getDB()
  const { path } = customProvidersMetadata[provider]
  const batch = db.batch()

  const userRef = doc(`users/${uid}`)
  const providerRef = doc(`users/${uid}/connections/${provider}`)
  batch.update(userRef, { [provider]: FieldValue.delete() })
  batch.delete(providerRef)

  await getQ(path, { uid }).then((snap) => {
    snap.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })
  })

  return batch
}
