import { IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
import { makeStyles } from "@mui/styles"
import { inTrainingStyles } from "../../../styles/improve/styles"
import { formatTime } from "../../../utils/improve/utils"
import { InTrainingProps } from "../../../types/improve/types"
import { useCountdown } from "../../../hooks/improve/hooks"
import Session from "../../../components/Session"
import buildSession from "../../../utils/session"

const useCloseButtonStyles = makeStyles({
  root: {
    position: "absolute",
    top: "10px",
    left: "10px",
  },
})

const InTraining = (props: InTrainingProps): React.ReactElement => {
  const timeLeft = useCountdown({ finishMs: props.finishMs })
  const closeButtonStyles = useCloseButtonStyles()

  return (
    <>
      <div className="improve-training-container">
        <IconButton
          onClick={props.onCancel}
          classes={closeButtonStyles}
          color="primary"
        >
          <Close />
        </IconButton>
        <Typography variant="h3">{formatTime(timeLeft)}</Typography>
        <Session sections={buildSession(props.hours)} totalDuration={props.hours}/>
      </div>
      <style jsx>{inTrainingStyles}</style>
    </>
  )
}

export default InTraining
