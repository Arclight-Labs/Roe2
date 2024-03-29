type UnknownObject = Record<string, unknown>

function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (match) => match.toUpperCase().replace(/[-_]/, ""))
}

function isObject(item: unknown) {
  return typeof item === "object" && !Array.isArray(item) && item !== null
}

/**
 * Ensures that the object uses snake case
 * @param obj
 * @returns
 */
export function snakeToCamel(obj: UnknownObject): UnknownObject {
  if (!isObject(obj)) return obj
  return Object.keys(obj).reduce((prev, key) => {
    // Check if current item is an object
    if (isObject(obj[key]))
      return {
        ...prev,
        [toCamelCase(key)]: snakeToCamel(obj[key] as UnknownObject),
      }

    // Check if current item is an array
    if (Array.isArray(obj[key])) {
      const arr = (obj[key] as unknown[]).map((data) =>
        isObject(data) ? snakeToCamel(data as UnknownObject) : data
      )
      return { ...prev, [toCamelCase(key)]: arr }
    }

    const newKey = toCamelCase(key)
    return { ...prev, [newKey]: obj[key] }
  }, {} as UnknownObject)
}
