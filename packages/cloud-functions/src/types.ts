import { firestore } from "firebase-admin"

export type FirestoreConverter<T> = firestore.FirestoreDataConverter<T>
export type Snap<T> = firestore.QueryDocumentSnapshot<T>
export type Col<T> = firestore.CollectionReference<T>
export type Doc<T> = firestore.DocumentReference<T>
