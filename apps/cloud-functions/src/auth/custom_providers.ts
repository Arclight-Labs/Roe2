export enum CustomProvider {
  Discord = "discord",
  Coinbase = "coinbase",
  AcadArena = "acadarena",
}

interface CustomProvidersMetadata {
  path: `customProviders/${CustomProvider}/users`
  tokenUri: string
  baseUri: string
  meUri: string
}

export const customProvidersMetadata: Record<
  CustomProvider,
  CustomProvidersMetadata
> = {
  [CustomProvider.Discord]: {
    path: "customProviders/discord/users",
    baseUri: "https://discord.com/api",
    tokenUri: "/oauth2/token",
    meUri: "/users/@me",
  },
  [CustomProvider.Coinbase]: {
    path: "customProviders/coinbase/users",
    baseUri: "https://api.coinbase.com",
    tokenUri: "/oauth/token",
    meUri: "/v2/user",
  },
  [CustomProvider.AcadArena]: {
    path: "customProviders/acadarena/users",
    baseUri: "https://api.acadarena.com",
    tokenUri: "/oauth/token",
    meUri: "/oauth/me",
  },
}
