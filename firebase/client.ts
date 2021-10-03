import { getApp, getApps, initializeApp } from "firebase/app"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth"
import { v4 as uuidv4 } from "uuid"
import { CompletedSession, Session } from "../utils/session"

const jsonString: string = process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "{}"
const firebaseConfig = JSON.parse(jsonString)
if (!getApps().length) {
  initializeApp(firebaseConfig)
}
const fb = getApp()
const auth = getAuth(fb)
const db = getFirestore(fb)

export const loginWithGoogle = async (): Promise<UserCredential> => {
  auth.config.authDomain = "rocket-league-coach.firebaseapp.com"
  const provider = new GoogleAuthProvider()
  return await signInWithPopup(auth, provider)
}

export const saveEpicID = async (
  id: string | null,
  epicID: string
): Promise<void> => {
  try {
    const uid = id || ""
    const document = doc(db, "epicIDs", uid)
    const data = { epicID }
    await setDoc(document, data)
  } catch (e) {
    console.error(e)
  }
}

export const getEpicIDFromId = async (id: string): Promise<string> => {
  try {
    const docRef = doc(db, "epicIDs", id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data().epicID : ""
  } catch (e) {
    console.error(e)
    return ""
  }
}

export const getPlayerSessions = async (
  userId: string
): Promise<CompletedSession[]> => {
  try {
    const q = query(collection(db, "sessions"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((d) => {
      const s: any = d.data()
      return s
    })
  } catch (e) {
    console.error(e)
    return []
  }
}

export const saveSession = async (
  session: Session,
  userId: string
): Promise<void> => {
  try {
    const uuid = uuidv4()
    const document = doc(db, "sessions", uuid)
    const completedSession: CompletedSession = {
      id: uuid,
      userId: userId,
      session: session,
      date: new Date().toISOString(),
    }
    await setDoc(document, completedSession)
  } catch (e) {
    console.error(e)
  }
}

export const getSession = async (uuid: string): Promise<any> => {
  try {
    const docRef = doc(db, "sessions", uuid)
    const docSnapshot = await getDoc(docRef)
    return docSnapshot.data() || null
  } catch (e) {
    console.error(e)
  }
}

export const getSessionsIds = async (
  session: Session,
  userId: string
): Promise<string[]> => {
  try {
    const sessions = await getPlayerSessions(userId)
    return sessions.map((s) => s.id)
  } catch (e) {
    console.error(e)
    return []
  }
}
