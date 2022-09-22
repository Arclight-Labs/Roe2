import doc from "./fsDoc"

export default async function getOne<T extends object>(
  ...pathSegments: string[]
) {
  const ref = doc<T>(...pathSegments)
  return ref.get()
}
