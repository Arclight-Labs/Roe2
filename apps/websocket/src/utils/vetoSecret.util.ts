export const getVetoSecret = () => {
  const secret = process.env.VETO_SECRET
  if (!secret) {
    throw new Error("Veto secret is not set!")
  }
  return secret
}
