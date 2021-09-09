import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

!firebase.apps.length && firebase.initializeApp(firebaseConfig)
firebase.auth().useDeviceLanguage()

const db = firebase.firestore()
const epicIDs = db.collection("epicIDs")

const mapUserFromFirebaseAuthToUser = async (user) => {
  console.log("mapUserFromFirebaseAuthToUser")
  const { displayName, email, photoURL, uid } = user
  const epicID = await getEpicIDFromUid(uid)
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
    epicID,
  }
}

export const onAuthStateChanged = (onChange) => {
  console.log("onAuthStateChanged")
  return firebase.auth().onAuthStateChanged(async (user) => {
    const normalizedUser = user
      ? await mapUserFromFirebaseAuthToUser(user)
      : null

    onChange(normalizedUser)
  })
}

export const logout = async () => {
  return await firebase.auth().signOut()
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const setEpicID = (uid, epicID) => {
  return epicIDs.doc(uid).set({
    epicID,
  })
}

export const getEpicIDs = () => {
  return epicIDs.get()
}

export const getEpicIDFromUid = async (uid) => {
  const doc = await epicIDs.doc(uid).get()
  return doc.exists ? doc.data().epicID : null
}

export const getStatsFromEpicID = async (epicID) => {
  return (await fetch("/api/stats/" + epicID)).json()
}
