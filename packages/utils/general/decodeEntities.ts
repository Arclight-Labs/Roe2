type DecodeEntities = (string: string) => string
export const decodeEntities: DecodeEntities = (encodedString) => {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g
  const translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
  }
  return encodedString
    .replace(translate_re, function (_, entity) {
      return translate[entity as keyof typeof translate]
    })
    .replace(/&#(\d+);/gi, function (_, numStr) {
      var num = parseInt(numStr, 10)
      return String.fromCharCode(num)
    })
}
