import type { CountdownResult, ImproveState } from "./types"
import { SubNavState } from "./types"

export const improveInitialState: ImproveState = {
  subNavState: SubNavState.notStarted,
  startMs: 0,
  finishMs: 0,
  hours: 0,
}

/**
 * Given finish time in ms, return formatted hours:minutes:seconds left
 * until that time.
 */
export const getTimeLeft = (finishMs: number): CountdownResult => {
  const finishDate = new Date(finishMs)
  const today = new Date()
  const diffTime = finishDate.getMilliseconds() - today.getMilliseconds()

  return {
    seconds: Math.floor((diffTime / 1000) % 60),
    minutes: Math.floor((diffTime / (1000 * 60)) % 60),
    hours: Math.floor((diffTime / (1000 * 60 * 60)) % 24),
  }
}

/**
 * Given hours,minutes,seconds object, format it to string
 */
export const formatTime = (timeLeft: CountdownResult): string => {
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

/**
 * =============================================================
 * DEBUG DATA
 * =============================================================
 */
export const inTrainingMockData = {
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
