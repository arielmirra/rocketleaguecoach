import { IconButton } from "@mui/material"
import { Close } from "@mui/icons-material"
import { closeButtonStyles, inTrainingStyles } from "../../../styles/improve/styles"
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
        <IconButton
          onClick={onCancel}
          sx={closeButtonStyles}
          color="primary"
        >
          <Close />
        </IconButton>
        <Session fullTime={timeLeft} session={session} style={{height: '100%'}}/>
        <MatButton onClick={() => onDone(session)} text='Done' loading={loading}/>
      </div>
      <style jsx>{inTrainingStyles}</style>
    </>
  )
}

export default InTraining
