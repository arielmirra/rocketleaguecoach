import { init } from "next-firebase-auth"

const initAuth = () => {
  init({
    authPageURL: "/",
    appPageURL: "/profile",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    // firebaseAuthEmulatorHost: "localhost:9099",
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        // The private key must not be accessible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyDPvt6_fgd4_6KtTYTBlJ9UTxsP9UsvFys",
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.PROJECT_ID,
    },
    cookies: {
      name: "rl-coach", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      // keys: [
      //   process.env.COOKIE_SECRET_CURRENT,
      //   process.env.COOKIE_SECRET_PREVIOUS,
      // ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: false, // set this to false in local (non-HTTPS) development
      signed: false,
    },
  })
}

export default initAuth
