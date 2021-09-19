import { getApp, getApps, initializeApp } from "firebase/app"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const jsonString: string = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  : "{}"
const firebaseConfig = JSON.parse(jsonString)
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

export const saveEpicID = (id: string | null, epicID: string) => {
  try {
    const uid = id ? id : ""
    const document = doc(db, "epicIDs", uid)
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

export const getEpicIDFromId = async (id: any) => {
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
