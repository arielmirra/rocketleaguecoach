import { IconButton } from "@mui/material"
import { Close } from "@mui/icons-material"
import { closeButtonStyles } from "../../../styles/improve/styles"
import { useCountdown } from "../../../hooks/improve/hooks"
import Session from "../../../components/Session"
import { buildSession } from "../../../utils/session"
import { MatButton } from "../../../hooks/formik"
import { useMemo } from "react"

interface InTrainingProps {
  finishMs: number
  minutes: number
  onCancel: () => void
  onDone: (newSessionData: any) => void
  loading: boolean
}

const InTraining = ({
  finishMs,
  minutes,
  onCancel,
  onDone,
  loading,
}: InTrainingProps) => {
  const timeLeft = useCountdown({ finishMs })

  const session = useMemo(() => buildSession(minutes), [minutes])

  return (
    <>
      <div className="improve-training-container">
        <IconButton onClick={onCancel} sx={closeButtonStyles} color="primary">
          <Close />
        </IconButton>
        <Session
          fullTime={timeLeft}
          session={session}
          style={{ height: "100%" }}
        />
        <MatButton
          onClick={() => onDone(session)}
          text="Done"
          loading={loading}
        />
      </div>
      <style jsx>{`
        .improve-training-container {
          position: relative;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          height: 100%;
        }
        .floating-icon-button {
          position: absolute;
          top: 10px;
          left: 10px;
        }
      `}</style>
    </>
  )
}

export default InTraining
