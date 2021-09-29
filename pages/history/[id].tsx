import Close from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next"
import { useRouter } from "next/router"
import { useMemo } from "react"
import Session from "../../components/Session"
import { closeButtonStyles } from "../../styles/improve/styles"
import { CompletedSession, randomCompletedSession } from "../../utils/session"

interface CompletedSessionPageProps {
  session: CompletedSession
}

export default function CompletedSessionPage({
  session,
}: CompletedSessionPageProps) {
  const router = useRouter()

  const fullTime = useMemo(
    () => ({
      hours: Math.floor(session.session.duration / 60),
      minutes: session.session.duration % 60,
      seconds: 0,
    }),
    [session.session.duration]
  )

  const handleGoBack = () => {
    router.push("/history/")
  }

  return (
    <>
      <div className="container">
        <IconButton
          onClick={handleGoBack}
          sx={closeButtonStyles}
          color="primary"
        >
          <Close />
        </IconButton>
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
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "asdasdsad" } },
      { params: { id: "asdasdasddsad" } },
      { params: { id: "adasd" } },
    ],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<CompletedSessionPageProps>> => {
  return {
    props: {
      session: randomCompletedSession(),
    },
  }
}
