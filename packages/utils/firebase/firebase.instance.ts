import "dotenv"
import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
import { getStorage, connectStorageEmulator } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDZ9GdrlFSRINMrnSJBrOfKXGb3q2f0-Gc",
  authDomain: "roe2-prod.firebaseapp.com",
  databaseURL:
    "https://roe2-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "roe2-prod",
  storageBucket: "roe2-prod.appspot.com",
  messagingSenderId: "679338301123",
  appId: "1:679338301123:web:0e6da95e1cb159e1b43476",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const fn = getFunctions(app)
export const storage = getStorage(app)

export function connectEmulators() {
  connectAuthEmulator(auth, "https://localhost:9099")
  connectFirestoreEmulator(db, "0.0.0.0", 8080)
  connectFunctionsEmulator(fn, "0.0.0.0", 5001)
  connectStorageEmulator(storage, "0.0.0.0", 9199)
}
