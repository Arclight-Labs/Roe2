export interface TwitterApiResultsItem extends Tweet {
  user: User
  images: string[]
}
export type TwitterApiResults = Record<string, TwitterApiResultsItem>

export interface TweetSearchResults {
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
  media: Medum[]
}

export interface Medum {
  media_key: string
  type: string
  url: string
  preview_image_url: string
}

export interface User {
  id: string
  name: string
  username: string
  profile_image_url: string
}

export interface Meta {
  newest_id: string
  oldest_id: string
  result_count: number
}
