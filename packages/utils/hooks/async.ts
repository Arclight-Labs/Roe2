export async function runAsync<T = any, E = any>(
  promise: Promise<T>
): Promise<[T | undefined, E | undefined]> {
  try {
    const value = await promise
    return [value, undefined]
  } catch (e) {
    return [undefined, e as E]
  }
}
