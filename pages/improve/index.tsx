import { addHours } from "date-fns"
import { useEffect, useState } from "react"
import InTraining from "./states/InTraining"
import NotStarted from "./states/NotStarted"
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import Loader from "../../components/Loader"
import { improveInitialState } from "../../utils/improve/utils"
import { ImproveState, SubNavState } from "../../types/improve/types"
import { improvePageStyles } from "../../styles/improve/styles"

function getNumberFromLocalStorage(key: string) {
  const item = localStorage.getItem("finishMs")
  return item ? +item : 0
}

const ImprovePage = () => {
  const authUser = useAuthUser()
  const [state, setState] = useState<ImproveState>(improveInitialState)

  /**
   * Manage state along with localStorage
   */
  useEffect(() => {
    let localStorageData: ImproveState
    if (typeof window !== "undefined") {
      localStorageData = {
        subNavState:
          (localStorage.getItem("subNavState") as SubNavState) ||
          SubNavState.notStarted,
        startMs: getNumberFromLocalStorage("startMs"),
        finishMs: getNumberFromLocalStorage("finishMs"),
        hours: getNumberFromLocalStorage("hours"),
      }

      setState(localStorageData)
    }

    return () => {
      localStorage.setItem("subNavState", SubNavState.notStarted)
    }
  }, [])

  return (
    <>
      <div className="improve-container">
        {state.subNavState === SubNavState.notStarted && (
          <NotStarted
            onStart={(hours, startMs) => {
              const finishMs = addHours(new Date(startMs), hours).getTime()
              localStorage.setItem("subNavState", SubNavState.inTraining)
              localStorage.setItem("finishMs", finishMs.toString())
              localStorage.setItem("hours", hours.toString())
              setState({
                subNavState: SubNavState.inTraining,
                startMs,
                finishMs,
                hours,
              })
            }}
          />
        )}
        {state.subNavState === SubNavState.inTraining && (
          <InTraining
            finishMs={state.finishMs}
            hours={state.hours}
            onCancel={() => {
              localStorage.setItem("subNavState", SubNavState.notStarted)
              setState(improveInitialState)
            }}
            onDone={(newSessionData) => {
              console.log("new session done", newSessionData)
            }}
          />
        )}
      </div>
      <style jsx>{improvePageStyles}</style>
    </>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(ImprovePage)
