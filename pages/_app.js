import AppLayout from "components/AppLayout"
import Link from "next/link"
import History from "../components/Icons/History"
import Improve from "../components/Icons/Improve"
import Profile from "../components/Icons/Profile"
import { colors } from "../styles/theme"
import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppLayout>
        <Head>
          <title>RL Coach</title>
        </Head>
        <header>
          <h2>Rocket League Coach</h2>
        </header>
        <Component {...pageProps} />
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
      </AppLayout>
      <style jsx>
        {`
          header {
            align-items: center;
            justify-content: center;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            border-bottom: 1px solid #eee;
            height: 49px;
            display: flex;
            position: sticky;
            top: 0;
            width: 100%;
          }

          h2 {
            font-size: 21px;
            font-weight: 800;
            padding-left: 15px;
          }

          nav {
            background: #fff;
            bottom: 0;
            border-top: 1px solid #eee;
            display: flex;
            height: 49px;
            position: absolute;
            width: 100%;
          }

          nav a {
            align-items: center;
            display: flex;
            flex: 1 1 auto;
            height: 100%;
            justify-content: center;
          }

          nav a:hover {
            background: radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }

          nav a:hover > :global(svg) {
            stroke: ${colors.primary};
          }
        `}
      </style>
    </>
  )
}
