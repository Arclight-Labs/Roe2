import { OAuthRequest } from "./tokens"

/**
 * An OAuth request token with optional discord parameters
 */
export interface DiscordOAuthRequest extends OAuthRequest {
  scope: string
}

// export interface DiscordAuthorize extends OAuthAuthorize {}
