import * as admin from "firebase-admin"

export * as functions from "firebase-functions"

admin.initializeApp()
export const db = admin.firestore()
export const auth = admin.auth()
