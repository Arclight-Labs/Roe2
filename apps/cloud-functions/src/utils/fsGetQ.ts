import q from "./fsQ"

export default function getQ<T extends Record<string, any>>(
  path: string,
  query: Partial<T> | Record<string, any>
) {
  return q(path, query).get()
}
