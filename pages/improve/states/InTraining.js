import useCountdown from "../../../hooks/useCountdown"
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

const mockData = {
  timeDivision: [1, 2, 4, 1, 2],
  mockSkills: [
    {
      id: "0",
      skillName: "Ataque",
      codes: [
        { name: "0aaaa0123kas", code: "NOTO-0934-IE03-MBZK" },
        { name: "Full agresivo", code: "JREI-2392-4958-JCOW" },
      ],
    },
    {
      id: "1",
      skillName: "Defensa",
      codes: [{ name: "Atajar rocket league ", code: "J39D-NWHA-JAL0-SJFK" }],
    },
    {
      id: "2",
      skillName: "Posicionamiento",
      codes: [
        { name: "Positional tactics", code: "J19Y-H6XN-LA1S-KCHS" },
        { name: "Positions 101", code: "1J8V-SH9W-N23O-2O83" },
        { name: "P0gger5", code: "K49X-KAL1-KDHR-4850" },
        { name: "Posiciones by Drakata", code: "M10J-K3OH-IO23-HXNM" },
        { name: "Positions", code: "1K02-FK0X-AM1L-D888" },
      ],
    },
    {
      id: "3",
      skillName: "Precision",
      codes: [
        { name: "Goal precisions #31", code: "J10S-SDK1-SLQL-QQSF" },
        { name: "General-precision", code: "SD02-FGHJ-31J4-XMAL" },
      ],
    },
    {
      id: "4",
      skillName: "Pases",
      codes: [
        { name: "Pases en pared", code: "1M0C-KSA1-KT60-6NUM" },
        { name: "Passing forward1", code: "12DG-NLY6-KD34-KFKK" },
      ],
    },
  ],
}

const formatTime = (timeLeft) => {
  const h = timeLeft.hours
  const m =
    timeLeft.minutes.toString().length === 1
      ? `0${timeLeft.minutes}`
      : timeLeft.minutes
  const s =
    timeLeft.seconds.toString().length === 1
      ? `0${timeLeft.seconds}`
      : timeLeft.seconds
  return `${h}:${m}:${s}`
}

const useCloseButtonStyles = makeStyles({
  root: {
    position: "absolute",
    top: "10px",
    left: "10px",
  },
})

export default function InTrainingSubPage({
  finishMs,
  hours,
  onCancel,
  onDone,
}) {
  const timeLeft = useCountdown(finishMs)
  const closeButtonStyles = useCloseButtonStyles()

  const verticalProgressBarData = useMemo(() => {
    const timeDivisionSum = mockData.timeDivision.reduce((a, b) => a + b)
    const totalMinutes = hours * 60
    return {
      minutes: mockData.timeDivision.map(
        (t) => (t / timeDivisionSum) * totalMinutes
      ),
      heights: mockData.timeDivision.map((t) => (t / timeDivisionSum) * 100),
    }
  }, [hours, mockData.timeDivision])

  return (
    <>
      <div className="improve-training-container">
        <IconButton
          onClick={onCancel}
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
            {mockData.mockSkills.map((skill) => {
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
const VerticalProgressBar = ({ verticalProgressBarData }) => {
  return (
    <>
      <div className="vertical-progress-bar">
        <div className="progress-bar">
          {verticalProgressBarData.heights.map((h, i) => (
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
          {verticalProgressBarData.minutes.map((m, i) => (
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

const SkillDescriptionItem = ({ skillName, codes }) => {
  return (
    <>
      <div className="skill-description-item">
        <Typography variant="h6">{skillName}</Typography>
        <List>
          {codes.map((code, i) => (
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

const RLCodeText = ({ text }) => {
  const RLCodeTextStyles = useRLCodeTextStyles()
  useEffect(() => {
    if (typeof navigator === "undefined") {
      console.log("navigator is defined")
    } else {
      console.log("navigator is NOT defined")
    }
  }, [])
  return (
    <div onClick={() => navigator.clipboard.writeText(text)}>
      <Typography classes={RLCodeTextStyles}>{text}</Typography>
    </div>
  )
}
