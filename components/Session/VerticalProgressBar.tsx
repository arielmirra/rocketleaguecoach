import { Typography } from "@mui/material"
import { verticalProgressBarColors } from "../../styles/theme"
import { SessionProps } from "../../types/components/types"
import { verticalProgressBarStyles } from "../../styles/improve/styles"

/**
 * Vertical Progress Bar
 * totalHours: divide progress bar into hours
 */
const VerticalProgressBar = (props: SessionProps): React.ReactElement => {
  return (
    <>
      <div className="vertical-progress-bar">
        <div className="progress-bar">
          {props.sections.map((section, i) => (
            <div
              key={`progress-${i}`}
              style={{
                height: `${section.duration}%`,
                backgroundColor: verticalProgressBarColors[i],
              }}
            />
          ))}
        </div>
        <div className="durations">
          {props.sections.map((section, i) => (
            <div
              key={`minute-${i}`}
              style={{ height: `${section.duration / props.totalDuration * 100}%` }}
            >
              <Typography>{`${section.duration}m`}</Typography>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{verticalProgressBarStyles}</style>
    </>
  )
}

export default VerticalProgressBar
