import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
if (!getApps().length) {
  initializeApp(firebaseConfig)
}
// firebase.auth().useDeviceLanguage()
const fb = getApp()
const auth = getAuth(fb)
const db = getFirestore(fb)
const epicIDs = collection(db, "epicIDs")

export const loginWithGoogle = async () => {
  auth.config.authDomain = "rocket-league-coach.firebaseapp.com"
  const provider = new GoogleAuthProvider()
  return await signInWithPopup(auth, provider)
}

// export const setEpicID = (uid, epicID) => {
//   return epicIDs.doc(uid).set({
//     epicID,
//   })
// }
//
// export const getEpicIDs = async () => {
//   return await epicIDs.get()
// }
//
// export const getEpicIDFromUid = async (uid) => {
//   const doc = await epicIDs.doc(uid).get()
//   return doc.exists ? doc.data().epicID : null
// }
