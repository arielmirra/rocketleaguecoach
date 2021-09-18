import { useEffect, useMemo } from "react"
import { colors, verticalProgressBarColors } from "../../../styles/theme"
import { IconButton, List, ListItem, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
import { makeStyles } from "@mui/styles"
import {
  inTrainingStyles,
  verticalProgressBarStyles,
  skillDescriptionItemStyles,
} from "../styles"
import { formatTime, inTrainingMockData } from "../utils"
import { InTrainingProps, RLCodeProps } from "../types"
import { useCountdown } from "../hooks"

const useCloseButtonStyles = makeStyles({
  root: {
    position: "absolute",
    top: "10px",
    left: "10px",
  },
})

export default function InTraining(props: InTrainingProps) {
  const timeLeft = useCountdown({ finishMs: props.finishMs })
  const closeButtonStyles = useCloseButtonStyles()

  const verticalProgressBarData = useMemo(() => {
    const timeDivisionSum = inTrainingMockData.timeDivision.reduce(
      (a, b) => a + b
    )
    const totalMinutes = props.hours * 60
    return {
      minutes: inTrainingMockData.timeDivision.map(
        (t) => (t / timeDivisionSum) * totalMinutes
      ),
      heights: inTrainingMockData.timeDivision.map(
        (t) => (t / timeDivisionSum) * 100
      ),
    }
  }, [props.hours, inTrainingMockData.timeDivision])

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
        <div className="content-container">
          <VerticalProgressBar
            verticalProgressBarData={verticalProgressBarData}
          />
          <div className="skills-codes-container">
            {inTrainingMockData.mockSkills.map((skill) => {
              return (
                <SkillDescriptionItem
                  key={`skill-${skill.id}`}
                  skillName={skill.skillName}
                  codes={skill.codes}
                />
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{inTrainingStyles}</style>
    </>
  )
}

/**
 * Vertical Progress Bar
 * totalHours: divide progress bar into hours
 */
const VerticalProgressBar = ({ verticalProgressBarData }: any) => {
  return (
    <>
      <div className="vertical-progress-bar">
        <div className="progress-bar">
          {verticalProgressBarData.heights.map((h: number, i: number) => (
            <div
              key={`progress-${i}`}
              style={{
                height: `${h}%`,
                backgroundColor: verticalProgressBarColors[i],
              }}
            />
          ))}
        </div>
        <div className="durations">
          {verticalProgressBarData.minutes.map((m: number, i: number) => (
            <div
              key={`minute-${i}`}
              style={{ height: `${verticalProgressBarData.heights[i]}%` }}
            >
              <Typography>{`${m}m`}</Typography>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{verticalProgressBarStyles}</style>
    </>
  )
}

interface Props {
  skillName: any
  codes: any
}

const SkillDescriptionItem = ({ skillName, codes }: Props) => {
  return (
    <>
      <div className="skill-description-item">
        <Typography variant="h6">{skillName}</Typography>
        <List>
          {codes.map((code: any, i: number) => (
            <ListItem key={`${skillName.toLowerCase()}-code-${i}`}>
              <Typography>{code.name}</Typography>
              <RLCodeText>{code.code}</RLCodeText>
            </ListItem>
          ))}
        </List>
      </div>
      <style jsx>{skillDescriptionItemStyles}</style>
    </>
  )
}

const useRLCodeTextStyles = makeStyles({
  root: {
    borderRadius: 3,
    backgroundColor: colors.primary,
    color: colors.white,
  },
})

const RLCodeText = (props: RLCodeProps) => {
  const RLCodeTextStyles = useRLCodeTextStyles()
  useEffect(() => {
    if (typeof navigator === "undefined") {
      console.log("navigator is defined")
    } else {
      console.log("navigator is NOT defined")
    }
  }, [])
  return (
    <div onClick={() => navigator.clipboard.writeText(props.children)}>
      <Typography classes={RLCodeTextStyles}>{props.children}</Typography>
    </div>
  )
}
