export type WithAuth<T extends object> = T & {
  authorization: string
}
