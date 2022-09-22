export interface CoinbaseResponse<T> {
  data: T
}

export interface CoinbaseResource {
  id: string
  resource: CoinbaseResourceType
  resource_path: string
}

export enum CoinbaseResourceType {
  User = "user",
  Account = "account",
  Address = "address",
  Transaction = "transaction",
  Buy = "buy",
  Sell = "sell",
  Deposit = "deposit",
  Withdrawal = "withdrawal",
  PaymentMethod = "payment_method",
}

export type CoinbaseMoneyHash = {
  amount: string
  currency: string
}

export enum CoinbaseScope {
  /**
   * List user's accounts and their balances
   */
  AccountRead = "wallet:accounts:read",

  /**
   * Update account (e.g. change name)
   */
  AccountUpdate = "wallet:accounts:update",

  /**
   * Create a new account (e.g. BTC wallet)
   */
  AccountCreate = "wallet:accounts:create",

  /**
   * Delete existing account
   */
  AccountDelete = "wallet:accounts:delete",

  /**
   * List account's bitcoin or ethereum addresses
   */
  AddressRead = "wallet:addresses:read",

  /**
   * Create new bitcoin or ethereum addresses for wallets
   */
  AddressCreate = "wallet:addresses:create",

  /**
   * List account's buys
   */
  BuyRead = "wallet:buys:read",

  /**
   * Buy bitcoin or ethereum
   */
  BuyCreate = "wallet:buys:create",

  /**
   * List account's deposits
   */
  DepositRead = "wallet:deposits:read",

  /**
   * Create a new deposit
   */
  DepositCreate = "wallet:deposits:create",

  /**
   * List user's notifications
   */
  NotificationRead = "wallet:notifications:read",

  /**
   * List user's payment methods (e.g. bank accounts)
   */
  PaymentMethodRead = "wallet:payment-methods:read",

  /**
   * Remove existing payment methods
   */
  PaymentMethodDelete = "wallet:payment-methods:delete",

  /**
   * Get detailed limits for payment methods (useful for performing buys and sells).
   * This permission is to be used together with wallet:payment-methods:read
   */
  PaymentMethodLimits = "wallet:payment-methods:limits",

  /**
   * List account's sells
   */
  SellRead = "wallet:sells:read",

  /**
   * Sell bitcoin or ethereum
   */
  SellCreate = "wallet:sells:create",

  /**
   * List account's transactions
   */
  TransactionRead = "wallet:transactions:read",

  /**
   * Send bitcoin or ethereum
   */
  TransactionSend = "wallet:transactions:send",

  /**
   * Request bitcoin or ethereum from a Coinbase user
   */
  TransactionRequest = "wallet:transactions:request",

  /**
   * Transfer funds between user's two bitcoin or ethereum accounts
   */
  TransactionTransfer = "wallet:transactions:transfer",

  /**
   * List detailed user information (public information is available without this permission)
   */
  UserRead = "wallet:user:read",

  /**
   * Update current user
   */
  UserUpdate = "wallet:user:update",

  /**
   * Read current user's email address
   */
  UserEmail = "wallet:user:email",

  /**
   * List account's withdrawals
   */
  WithdrawalRead = "wallet:withdrawals:read",

  /**
   * Create a new withdrawal
   */
  WithdrawalCreate = "wallet:withdrawals:create",
}
