import { CoinbaseScope } from "./coinbase_utility_types"
import { OAuthAuthorize } from "./tokens"

// export interface CoinbaseOAuthRequest extends OAuthRequest {}

/**
 * An OAuth request with optional coinbase parameters
 */
export interface CoinbaseAuthorize extends OAuthAuthorize {
  scope: CoinbaseScope

  /**
   * For logged out users, login view is shown by default.
   * You can show the sign up page instead with value signup
   */
  layout?: "signup"

  /**
   * Earn a referral bonus from new users who sign up via OAuth.
   * Value needs to be set to developer's referral ID (username).
   */
  referral?: string

  /**
   * Change the account access the application will receive. Available values:
   *
   *  - `select` (default) Allow user to pick the wallet associated with the application
   *  - `all` Application will get access to all of user's wallets
   */
  account?: "all" | "select"

  meta?: {
    /**
     * Name for this session (not a name for your application.)
     * This will appear in the user's account settings underneath your application's name.
     * Use it to provide identifying information if your app is often authorized multiple times
     */
    name?: string

    /**
     * Limit for the amount of money your application can send from the user's account.
     * This will be displayed on the authorize screen
     */
    send_limit_amount?: string

    /**
     * Supported fiat currency of `send_limit_amount` in ISO format, ex. `EUR`, `USD`
     */
    send_limit_currency?: string

    /**
     * How often the send money limit expires.
     * Default is `month` - allowed values are `day`, `month` and `year`
     */
    send_limit_period?: "day" | "month" | "year"
  }
}
