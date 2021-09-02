import { useEffect } from "react"
import Head from "next/head"

import Button from "components/Button"
import Logo from "components/Icons/Logo"

import { colors } from "styles/theme"

import { loginWithGoogle } from "firebase/client"

import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"
import Google from "../components/Icons/Google"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/improve")
  }, [user])

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
        <h1>Rocket League Coach</h1>
        <h2>
          Jugá mejor a Rocket League
          <br />
          De forma fácil y rápida 🚗🚀⚽️
        </h2>

        <div className="login-button">
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <Google /> <p>Inicia sesión con Google</p>
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
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
          place-content: space-around;
          place-items: center;
        }

        h1 {
          color: ${colors.white};
          font-weight: 800;
          font-size: 42px;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.white};
          font-size: 25px;
          margin: 0;
        }

        p {
          margin: 10px;
          font-size: 1.2em;
        }
      `}</style>
    </>
  )
}
