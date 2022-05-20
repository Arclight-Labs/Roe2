import { Err, functions, twitterAxios } from "../admin"

export interface Result {
  data: Tweet[]
  includes: Includes
  meta: Meta
}

export interface Tweet {
  text: string
  created_at: string
  id: string
  author_id: string
  attachments?: Attachments
}

export interface Attachments {
  media_keys: string[]
}

export interface Includes {
  users: User[]
}

export interface User {
  id: string
  name: string
  username: string
}

export interface Meta {
  newest_id: string
  oldest_id: string
  result_count: number
}

interface Props {
  search: string
}
export const twitterAPI = functions
  .region("asia-east2")
  .https.onCall(async (props: Props, context) => {
    if (!context.auth) {
      throw new Err("unauthenticated", "Login Required")
    }

    const api = await twitterAxios()
    const path = "/tweets/search/recent"
    const query = encodeURI(`${props.search} -is:retweet`)
    const fields = "attachments,id,text,created_at,author_id"
    const max_results = 100
    const expands = "author_id"
    const config = {
      params: { twitter: { fields, query }, max_results, expands },
    }
    const { data } = await api.get<Result>(path, config)
    return data
  })
