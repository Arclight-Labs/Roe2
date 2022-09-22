import {
  CoinbaseMoneyHash,
  CoinbaseResource,
  CoinbaseResourceType,
  CoinbaseResponse,
} from "./coinbase_utility_types"

/**
 * ### HTTP Requests
 * - GET https://api.coinbase.com/v2/accounts
 * - GET, PUT, DELETE https://api.coinbase.com/v2/accounts/:account_id
 *
 * ### Scopes
 * - `wallet:accounts:read`
 * - `wallet:accounts:update`
 * - `wallet:accounts:delete`
 *
 * #### {@link https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-accounts READ MORE}
 */
export interface CoinbaseAccount extends CoinbaseResource {
  name: string
  primary: boolean
  type: CoinbaseAccountType
  currency: string
  balance: CoinbaseMoneyHash
  created_at: Date
  updated_at: Date
  resource: CoinbaseResourceType.Account
}

export enum CoinbaseAccountType {
  Wallet = "wallet",
  Fiat = "fiat",
  Vault = "vault",
}

export type CoinbaseAccountResponse = CoinbaseResponse<CoinbaseAccount>
