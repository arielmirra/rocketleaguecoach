import { useEffect, useState } from "react"
import {FullTime } from "../../types/improve/types"
import { getTimeLeft } from "../../utils/improve/utils"

interface CountdownProps {
  finishMs: number
}
/**
 * Given finish time, returns hours:minutes:seconds and updates
 * frequently.
 */
export const useCountdown = ({ finishMs }: CountdownProps): FullTime => {
  const [timeLeft, setTimeLeft] = useState<FullTime>(
    getTimeLeft(finishMs)
  )

  useEffect(() => {
    let newTimeLeft: FullTime = getTimeLeft(finishMs);
    if (newTimeLeft.hours < 0 || newTimeLeft.minutes < 0 || newTimeLeft.seconds < 0) {
      newTimeLeft = { hours: 0, minutes: 0, seconds: 0 }
    }
    const timer = setTimeout(() => {
      setTimeLeft(newTimeLeft)
    }, 500)

    return () => clearInterval(timer)
  })

  return timeLeft
}
