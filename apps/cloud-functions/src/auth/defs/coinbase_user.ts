import {
  CoinbaseResource,
  CoinbaseResourceType,
  CoinbaseResponse,
} from "./coinbase_utility_types"

/**
 * To get user's email or private information,
 * use permissions `wallet:user:email` and `wallet:user:read`.
 *
 * If current request has a `wallet:transactions:send` scope,
 * then the response will contain a boolean `sends_disabled` field
 * that indicates if the user's send functionality has been disabled.
 *
 * ### HTTP Request
 * - GET, PUT https://api.coinbase.com/v2/user
 *
 *  ### Scopes
 * - No scope required for public data
 * - `wallet:user:read`
 * - `wallet:user:email`
 * - `wallet:user:update`
 *
 * {@link https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-users Read More...}
 */
export interface CoinbaseUser extends CoinbaseResource {
  name: string | null
  username: string | null
  profile_location: string | null
  profile_bio: string | null
  profile_url: string | null
  avatar_url: string
  sends_disabled?: boolean
  resource: CoinbaseResourceType.User
}

export type CoinbaseUserResponse = CoinbaseResponse<CoinbaseUser>
