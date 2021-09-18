import { getApp, getApps, initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore"
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

export const saveEpicID = (id, epicID) => {
  try {
    const document = doc(db, "epicIDs", id)
    const data = { epicID }
    setDoc(document, data)
  } catch (e) {
    console.error(e)
  }
}

export const getEpicIDs = async () => {
  try {
    const querySnapshot = await getDocs(epicIDs)
    return querySnapshot.docs.map((d) => d.data())
  } catch (e) {
    console.error(e)
  }
}

export const getEpicIDFromId = async (id) => {
  try {
    const docRef = doc(db, "epicIDs", id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data().epicID : null
  } catch (e) {
    console.error(e)
  }
  // const doc = await epicIDs.doc(id).get()
  // return doc.exists ? doc.data().epicID : null
}
