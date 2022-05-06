type FromHashMap = <T = any>(hashMap: Map<string, T>) => Record<string, T>
type ToHashMap = <T = any>(map: Record<string, T>) => Map<string, T>

export const fromHashMap: FromHashMap = (hashMap = new Map()) => {
  const arr = [...hashMap.entries()]
  return arr.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value }
  }, {})
}

export const toHashMap: ToHashMap = (obj = {}) => {
  const entries = Object.entries(obj)
  return new Map(entries)
}
