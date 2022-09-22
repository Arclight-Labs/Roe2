import col from "./fsCol"

export default async function addOne<T extends object>(path: string, data: T) {
  const ref = col<T>(path)
  return ref.add(data)
}
