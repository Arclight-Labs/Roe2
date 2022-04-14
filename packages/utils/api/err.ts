export interface Error {
  message: string
  errors: { message: string; value: any; path: string }[]
}

export function ErrMsg(error: Error) {
  const { message = "", errors = [] } = error
  console.log(error)
  const errorMessages = errors
    .map(
      ({ message, value, path }, i) =>
        `ERROR [${i}]: ${path} = '${value}'\nERROR [${i}]: ${message}`
    )
    .join("\n")
  return errorMessages || message || "Something went wrong"
}
