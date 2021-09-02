import firebase from "firebase"

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

!firebase.apps.length && firebase.initializeApp(firebaseConfig)
firebase.auth().useDeviceLanguage()

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null

    onChange(normalizedUser)
  })
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const setEpicId = (uid, epicId) => {
  alert(uid + " --> " + epicId)
  return db.collection("epicIds").add({
    uid,
    epicId,
    // createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  })
}
// TODO: save and get epic IDs of users
// export const getEpicId = (uid) => {
//   return db.collection("epicIds").get()
// }

// const mapDevitFromFirebaseToDevitObject = (doc) => {
//   const data = doc.data()
//   const id = doc.id
//   const { createdAt } = data
//
//   return {
//     ...data,
//     id,
//     createdAt: +createdAt.toDate(),
//   }
// }
//
// export const listenLatestDevits = (callback) => {
//   return db
//     .collection("devits")
//     .orderBy("createdAt", "desc")
//     .limit(20)
//     .onSnapshot(({ docs }) => {
//       const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
//       callback(newDevits)
//     })
// }
//
// export const uploadImage = (file) => {
//   const ref = firebase.storage().ref(`images/${file.name}`)
//   return ref.put(file)
// }
