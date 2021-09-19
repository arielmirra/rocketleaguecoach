import Link from "next/link"
import History from "../components/Icons/History"
import Improve from "../components/Icons/Improve"
import Profile from "../components/Icons/Profile"
import Head from "next/head"
import { Typography } from "@mui/material"
import styles, { globalStyles } from "../styles/styles"
import initAuth from "../initAuth"
import type AppProps from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../styles/theme"
import { useRouter } from "next/router"
import { grey } from "@mui/material/colors"

initAuth()

interface MyAppProps extends AppProps {
  Component: any
  pageProps: any
}

interface SmartLinkProps {
  href: string
  children: React.ReactNode
}

function SmartLink({ href, children }: SmartLinkProps) {
  const router = useRouter()
  const isInHref = router.pathname.indexOf(href) === 0
  return (
    <>
      <Link href={href}>
        <a>{children}</a>
      </Link>
      <style jsx>
        {`
          a {
            align-items: center;
            display: flex;
            flex: 1 1 auto;
            height: 100%;
            justify-content: center;
            background-color: ${isInHref ? grey[200] : "transparent"};
          }
        `}
      </style>
    </>
  )
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props
  return (
    <>
      <div className="main-container">
        <main>
          <Head>
            <title>RL Coach</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
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
            <SmartLink href={"/history"}>
              <History width={32} height={32} />
            </SmartLink>
            <SmartLink href={"/improve"}>
              <Improve width={32} height={32} />
            </SmartLink>
            <SmartLink href={"/profile"}>
              <Profile width={32} height={32} />
            </SmartLink>
          </nav>
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
