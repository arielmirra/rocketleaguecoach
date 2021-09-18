import Head from "next/head"
import Google from "../components/Icons/Google"
import { Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { loginWithGoogle } from "../firebase/client"
import { AuthAction, withAuthUser } from "next-firebase-auth"
import Loader from "../components/Loader"
import Button from "../components/Button"
import Logo from "../components/Icons/Logo"
import { colors } from "../styles/theme"

const useStyles = makeStyles({
  text: {
    color: "white",
  },
})

const Home = () => {
  const classes = useStyles()

  const googleAuth = async () => {
    await loginWithGoogle()
  }

  return (
    <>
      <Head>
        <title>RL Coach</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Logo width="350" />
        <Typography className={classes.text} variant="h4">
          Rocket League Coach
        </Typography>
        <Typography className={classes.text} variant="h5">
          Jugá mejor a Rocket League
          <br />
          De forma fácil y rápida 🚗🚀⚽️
        </Typography>

        <div className="login-button">
          <Button onClick={googleAuth} disabled={false}>
            <Google /> <Typography>Inicia sesión con Google</Typography>
          </Button>
        </div>
      </section>

      <style jsx>{`
        img {
          width: 80px;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: space-evenly;
          place-items: center;
        }

        h1 {
          color: ${colors.white};
          font-weight: 800;
          font-size: 33px;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.white};
          font-size: 20px;
          margin: 0;
        }

        p {
          margin: 10px;
          font-size: 15px;
        }
      `}</style>
    </>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  LoaderComponent: Loader,
})(Home)
