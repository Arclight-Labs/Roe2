import "dotenv"
import { applicationDefault, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"

export const adminApp = initializeApp({
  credential: applicationDefault(),
  projectId: "roe2-prod",
})

export const adminDb = () => getFirestore(adminApp)
export const adminAuth = () => getAuth(adminApp)
export const adminStorage = () => getStorage(adminApp)

if (process.env.NODE_ENV === "development") {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080"
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099"
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199"
}
