export interface Tokens {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

/**
 * ## OAuth Request
 * OAuth request is the first step in OAuth flow.
 *
 * This interface is usually applied as a
 * query parameter to an **OAuth Authorization URI**.
 *
 * e.g.
 * ```sh
 * curl -X Get "https://www.coinbase.com/oauth/authorize?client_id=ABC123&redirect_uri=https%3A%2F%2Fapp.acadarena.com%2Fauth%2Fcoinbase&response_type=code&scope=wallet%3Auser%3Aread`
 * ```
 * ! Make sure that your uri is url encoded
 *
 * Some OAuth implementations accepts
 * additional parameters.
 *
 * After a user have successfully connected
 * their account, they will be redirected to
 * your application with an authorization code.
 *
 * The authorization code is usually appended
 * to the redirect_uri as query parameter (`code`)
 *
 */
export interface OAuthAuthorize {
  client_id: string
  response_type: OAuthResponseType
  redirect_uri: string
  scope?: string
  state?: string
}

/**
 * ## OAuth Token Exchange
 * OAuth token exchange is the next step in OAuth flow.
 *
 * This interface is usually applied as body/data
 * to a POST request to an **OAuth Token URI**.
 *
 * e.g.
 * `curl -X POST "https://www.coinbase.com/oauth/token" -d "grant_type=authorization_code&code=ABC123&client_id=EFG456&client_secret=HJK789&redirect_uri=https://app.acadarena.com/oauth/coinbase"`
 *
 * The server will respond with access token. You can
 * use the token to make an api call
 */
export interface OAuthRequest {
  grant_type: OAuthGrantType
  code: string
  client_id: string
  client_secret: string
  redirect_uri: string
}

export type OAuthGrantType = "authorization_code" | "refresh_token"
export type OAuthResponseType = "code"
