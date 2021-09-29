import Close from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import { useMemo } from "react"
import Session from "../../components/Session"
import { closeButtonStyles } from "../../styles/improve/styles"
import Link from "next/link"
import { getSession } from "../../firebase/client"
import { CompletedSession, randomCompletedSession } from "../../utils/session"
import Typography from "@mui/material/Typography"

interface CompletedSessionPageProps {
  session: CompletedSession
}

const CompletedSessionPage = ({ maybeSession }: any) => {
  console.log(maybeSession)
  const session = maybeSession || randomCompletedSession()
  const fullTime = useMemo(
    () => ({
      hours: Math.floor(session.session.duration / 60),
      minutes: session.session.duration % 60,
      seconds: 0,
    }),
    [session.session.duration]
  )

  if (maybeSession) {
    return (
      <>
        <div className="container">
          <Link href={"/history/"} passHref>
            <IconButton sx={closeButtonStyles} color="primary">
              <Close />
            </IconButton>
          </Link>
          <Session
            completedSession={{ date: session.date }}
            fullTime={fullTime}
            session={session.session}
          />
        </div>
        <style jsx>{`
          .container {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding-top: 20px;
            height: 100%;
          }
        `}</style>
      </>
    )
  } else {
    return (
      <>
        <div className="container">
          <Link href={"/history/"} passHref>
            <IconButton sx={closeButtonStyles} color="primary">
              <Close />
            </IconButton>
          </Link>
        </div>
        <Typography variant="h4" align="center">
          No se ha encontrado la sesión solicitada
        </Typography>
        <style jsx>{`
          .container {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding-top: 20px;
            height: 50%;
          }
        `}</style>
      </>
    )
  }
}

export async function getServerSideProps(context: any) {
  const id = context.params.id
  const maybeSession = await getSession(id)
  return {
    props: { maybeSession }, // will be passed to the page component as props
  }
}

export default CompletedSessionPage
