import { Err, functions, twitterAxios } from "../admin"
import { TweetSearchResults } from "interface/utils/Twitter.interface"
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
    const query = `${encodeURI(props.search)} -is:retweet`
    const tweetFields = "attachments,id,text,created_at,author_id"
    const userFields = "id,name,username,profile_image_url"
    const mediaFields = "type,url,preview_image_url"
    const max_results = 100
    const expansions = "author_id,attachments.media_keys"
    const config = {
      params: {
        "tweet.fields": tweetFields,
        "user.fields": userFields,
        "media.fields": mediaFields,
        query,
        max_results,
        expansions,
      },
    }
    try {
      const { data } = await api.get<TweetSearchResults>(path, config)

      const entries = data.data.map((tweet) => {
        const users = data.includes.users
        const user = users.find((user) => user.id === tweet.author_id) || null
        if (user) {
          user.profile_image_url = user.profile_image_url.replace("_normal", "")
        }
        const mediaList = data.includes.media
        const mediaKeys = tweet.attachments?.media_keys ?? []
        const text = tweet.text.replace(/https:\/\/t\.co\/.*/, "").trim()
        // reduce to array of photo urls
        const images = mediaKeys?.reduce<string[]>((acc, key) => {
          const media = mediaList.find((m) => m.media_key === key)
          if (media?.type === "photo") {
            return [...acc, media.url]
          }
          if (media?.type === "animated_gif") {
            const re = /.*tweet_video_thumb\/(.*)\.jpg/
            const id = re.exec(media.preview_image_url)?.[1] || ""
            const newUrl = `https://video.twimg.com/tweet_video/${id}.mp4`
            if (!id) return acc
            return [...acc, newUrl]
          }
          return acc
        }, [])
        const newTweet = { ...tweet, user, images, text }
        return [tweet.id, newTweet]
      })
      return Object.fromEntries(entries)
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = (e as any)?.response?.data?.errors
      console.error(err)
      throw new Err("internal", "Internal Server Error", err)
    }
  })
