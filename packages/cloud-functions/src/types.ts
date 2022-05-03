import { firestore } from "firebase-admin"

export type FirestoreConverter<T> = firestore.FirestoreDataConverter<T>
export type Snap<T> = firestore.QueryDocumentSnapshot<T>
