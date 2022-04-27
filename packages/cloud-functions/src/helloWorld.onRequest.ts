import { functions } from "./admin"

export const helloWorld = functions.https.onRequest((request, response) => {
  console.log("IS EMULATED", process.env.IS_EMULATED)
  functions.logger.info("Hello logs!", { structuredData: true })
  response.send("Hello from Firebase!")
})
