import crypto from "crypto"

export default function hash(value: string) {
  const algo = "sha512"
  const secret = process.env.DEV_SECRET || ""
  return crypto.createHmac(algo, secret).update(value).digest("hex")
}
