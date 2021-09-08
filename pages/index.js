import Head from "next/head"
import Button from "components/Button"
import Logo from "components/Icons/Logo"
import { colors } from "styles/theme"
import { useRouter } from "next/router"
import { USER_STATES } from "hooks/useUser"
import Google from "../components/Icons/Google"
import { Typography, makeStyles } from "@material-ui/core"
import withUser from "wrappers/withUser"
import { loginWithGoogle } from "../firebase/client"

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.white,
  },
}))

const Home = ({ user }) => {
  const router = useRouter()
  const classes = useStyles()

  const handleClick = () => {
    loginWithGoogle().catch((err) => {
      console.log(err)
    })
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
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <Google /> <Typography>Inicia sesión con Google</Typography>
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
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
          background-image: linear-gradient(
            to bottom left,
            ${colors.primary},
            ${colors.secondary}
          );
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

export default withUser(Home)
