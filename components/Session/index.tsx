import Typography from "@mui/material/Typography"
import { sessionStyles } from "./styles"
import { colors, verticalProgressBarColors } from "../../styles/theme"
import { SessionProps } from "./types"
import { SectionType } from "../../utils/session"
import RLCodeText from "./RLCodeText"
import { formatTime, formatTimeCompleted } from "../../utils/improve/utils"
import { format } from "date-fns"

const Session = ({
  fullTime,
  session,
  completedSession,
  style,
}: SessionProps) => {
  return (
    <>
      <div className="session" style={style}>
        <div className="title">
          <Typography variant="h3">
            {completedSession
              ? formatTimeCompleted(fullTime)
              : formatTime(fullTime)}
          </Typography>
          {!!completedSession && (
            <Typography sx={{ color: colors.darkGray }}>
              {format(new Date(completedSession.date), "dd MMMM, yyyy")}
            </Typography>
          )}
        </div>
        <div className="sections">
          {session.sections.map((section, i) => {
            return (
              <div
                className="section-container"
                key={`section-${i}`}
                style={{
                  height: `${(section.duration / session.duration) * 100}%`,
                }}
              >
                <div
                  className="progress-bar"
                  style={{ backgroundColor: verticalProgressBarColors[i] }}
                />
                <div className="duration">
                  <Typography>{`${Math.round(section.duration)}m`}</Typography>
                </div>
                <div className="texts-container">
                  <Typography variant="h6">{section.name}</Typography>
                  {section.type === SectionType.training && (
                    <div className="codes-container">
                      {section.trainings.map((code, j) => (
                        <div className="code" key={`code-${j}`}>
                          <Typography
                            sx={{
                              maxWidth: "200px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {code.name}
                          </Typography>
                          <RLCodeText>{code.code}</RLCodeText>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{sessionStyles}</style>
    </>
  )
}

export default Session
