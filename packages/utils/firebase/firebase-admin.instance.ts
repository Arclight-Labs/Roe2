import "dotenv/config"
import {
  getApp as getAdminApp,
  getApps,
  initializeApp,
} from "firebase-admin/app"
import { getAuth as getAdminAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage as getAdminStorage } from "firebase-admin/storage"

const appExists = (appName?: string) =>
  appName
    ? getApps().findIndex((app) => app.name === appName) >= 0
    : !!getApps().length
const getApp = () => (appExists() ? getAdminApp() : initApp())
export const initApp = () => initializeApp({ projectId: "roe2-prod" })
export const getDB = () => getFirestore(getApp())
export const getAuth = () => getAdminAuth(getApp())
export const getStorage = () => getAdminStorage(getApp())

if (process.env.NODE_ENV === "development") {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080"
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099"
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199"
}
