import findOne from "./fsFindOne"

export default async function findOneAndDelete<
  T extends Record<string, unknown>
>(path: string, queryObj: Partial<T>) {
  const snap = await findOne<T>(path, queryObj)
  return snap?.ref.delete() || null
}
