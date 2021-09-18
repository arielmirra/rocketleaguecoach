import { useEffect, useState } from "react"

export default function useCountDown(finishMs) {
  const _d = () => {
    const finishDate = new Date(finishMs)
    const today = new Date()
    const diffTime = finishDate.getMilliseconds() - today.getMilliseconds()
    return {
      seconds: Math.floor((diffTime / 1000) % 60),
      minutes: Math.floor((diffTime / (1000 * 60)) % 60),
      hours: Math.floor((diffTime / (1000 * 60 * 60)) % 24),
    }
  }

  const [timeLeft, setTimeLeft] = useState(_d())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(_d())
    }, 500)

    return () => clearInterval(timer)
  })

  return timeLeft
}
