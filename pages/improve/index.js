import { addHours } from "date-fns"
import { useEffect, useState } from "react"
import InTrainingSubPage from "./states/InTraining"
import NotStartedSubPage from "./states/NotStarted"
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import Loader from "../../components/Loader"

const subNavStates = { notStarted: "0", inTraining: "1" }
const initialState = {
  subNavState: subNavStates.notStarted,
  finishMs: 0,
}

const ImprovePage = () => {
  const AuthUser = useAuthUser()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let localStorageData
    if (typeof window !== "undefined") {
      localStorageData = {
        subNavState: localStorage.getItem("subNavState"),
        finishMs: +localStorage.getItem("finishMs"),
        hours: +localStorage.getItem("hours"),
      }
    }
    setState({
      subNavState: localStorageData.subNavState || subNavStates.notStarted,
      finishMs: localStorageData.finishMs || 0,
      hours: localStorageData.hours || 0,
    })

    return () => {
      localStorage.setItem("subNavState", subNavStates.notStarted)
    }
  }, [])
  return (
    <>
      <div className="improve-container">
        {state.subNavState === subNavStates.notStarted && (
          <NotStartedSubPage
            onStart={(hours, startMs) => {
              const finishMs = addHours(new Date(startMs), hours).getTime()
              localStorage.setItem("subNavState", subNavStates.inTraining)
              localStorage.setItem("finishMs", finishMs.toString())
              localStorage.setItem("hours", hours.toString())
              setState({
                subNavState: subNavStates.inTraining,
                finishMs,
                hours,
              })
            }}
          />
        )}
        {state.subNavState === subNavStates.inTraining && (
          <InTrainingSubPage
            finishMs={state.finishMs}
            hours={state.hours}
            onCancel={() => {
              localStorage.setItem("subNavState", subNavStates.notStarted)
              setState({
                subNavState: subNavStates.notStarted,
                startMs: 0,
                hours: 0,
              })
            }}
            onDone={(newSessionData) => {
              console.log("new session done", newSessionData)
            }}
          />
        )}
      </div>
      <style jsx>{`
        .improve-container {
          height: 100%;
          overflow: auto;
        }
      `}</style>
    </>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(ImprovePage)
