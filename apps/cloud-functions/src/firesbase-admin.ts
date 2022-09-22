import { initializeApp } from "firebase-admin/app"
import { getAuth as getAdminAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage as getAdminStorage } from "firebase-admin/storage"

const app = initializeApp()
export const getDB = () => getFirestore(app)
export const getAuth = () => getAdminAuth(app)
export const getStorage = () => getAdminStorage(app)

if (process.env.NODE_ENV === "development") {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080"
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099"
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199"
}
