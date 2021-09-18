import { useEffect, useState } from "react"
import { CountdownProps, CountdownResult } from "../../types/improve/types"
import { getTimeLeft } from "../../utils/improve/utils"

/**
 * Given finish time, returns hours:minutes:seconds and updates
 * frequently.
 */
export const useCountdown = (props: CountdownProps): CountdownResult => {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(getTimeLeft(props.finishMs))


  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeLeft(props.finishMs))
    }, 500)

    return () => clearInterval(timer)
  })

  return timeLeft
}
