export const sanitizeHashMap = <T = any>(
  hashMap: Map<string, T> = new Map<string, T>()
): Record<string, T> => {
  return [...hashMap.entries()].reduce((acc, [key, value]) => {
    return { [key]: value }
  }, {})
}
