import Link from "next/link"
import History from "../components/Icons/History"
import Improve from "../components/Icons/Improve"
import Profile from "../components/Icons/Profile"
import Head from "next/head"
import { Typography } from "@mui/material"
import styles, { globalStyles } from "./styles"
import initAuth from "../initAuth"
import type { AppProps /*, AppContext */ } from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../styles/theme"

initAuth()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <main>
          <Head>
            <title>RL Coach</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <div id="body">
            <header>
              <Typography variant="h5">
                <strong>Rocket League Coach</strong>
              </Typography>
            </header>
            <div id="content">
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </div>
            <nav>
              <Link href={"/history"}>
                <a>
                  <History width={32} height={32} stroke="#09f" />
                </a>
              </Link>
              <Link href={"/improve"}>
                <a>
                  <Improve width={32} height={32} stroke="#09f" />
                </a>
              </Link>
              <Link href={"/profile"}>
                <a>
                  <Profile width={32} height={32} stroke="#09f" />
                </a>
              </Link>
            </nav>
          </div>
        </main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default MyApp