export interface DiscordUserResponse {
  application: Application
  scopes: string[]
  expires: string
  user: DiscordUser
}

export interface DiscordUser {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
}

interface Application {
  id: string
  name: string
  icon?: string
  description: string
  summary: string
  hook: boolean
  bot_public: boolean
  bot_require_code_grant: boolean
  verify_key: string
}
