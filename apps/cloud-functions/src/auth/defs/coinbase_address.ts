import {
  CoinbaseResource,
  CoinbaseResourceType,
  CoinbaseResponse,
} from "./coinbase_utility_types"

/**
 * Address resource represents an address for any {@link https://help.coinbase.com/en/coinbase/supported-crypto Coinbase supported asset}.
 * An account can have more than one address,
 * and an address should be used only once.
 *
 * ### HTTP Requests
 * - GET, POST https://api.coinbase.com/v2/accounts/:account_id/addresses
 *
 * ### Scopes
 * - `wallet:addresses:read`
 * - `wallet:addresses:create`
 *
 * ### {@link https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-addresses Read more}
 */
export interface CoinbaseAddress extends CoinbaseResource {
  /**
   * Address for any {@link https://help.coinbase.com/en/coinbase/supported-crypto Coinbase supported asset}.
   */
  address: string

  /**
   * User defined label for the address
   */
  name: string

  /**
   * Name of the blockchain
   */
  network: string
  created_at: Date
  updated_at: Date
  resource: CoinbaseResourceType.Address
}

export type CoinbaseAddressResponse = CoinbaseResponse<CoinbaseAddress>
