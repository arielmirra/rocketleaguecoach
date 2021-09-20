import { addMinutes } from "date-fns"
import { useEffect, useState } from "react"
import InTraining from "./states/InTraining"
import NotStarted from "./states/NotStarted"
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import Loader from "../../components/Loader"
import { improveInitialState } from "../../utils/improve/utils"
import { ImproveState, SubNavState } from "../../types/improve/types"
import { improvePageStyles } from "../../styles/improve/styles"
import { saveSession } from "../../firebase/client"
import { Session } from "../../utils/session"

function getNumberFromLocalStorage(key: string) {
  const item = localStorage.getItem(key)
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
        minutes: getNumberFromLocalStorage("minutes"),
        loading: false,
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
            onStart={(minutes, startMs) => {
              const finishMs = addMinutes(new Date(startMs), minutes).getTime()
              localStorage.setItem("subNavState", SubNavState.inTraining)
              localStorage.setItem("finishMs", finishMs.toString())
              localStorage.setItem("minutes", minutes.toString())
              setState({
                subNavState: SubNavState.inTraining,
                startMs,
                finishMs,
                minutes,
                loading: false,
              })
            }}
          />
        )}
        {state.subNavState === SubNavState.inTraining && (
          <InTraining
            finishMs={state.finishMs}
            minutes={state.minutes}
            loading={state.loading}
            onCancel={() => {
              localStorage.setItem("subNavState", SubNavState.notStarted)
              setState(improveInitialState)
            }}
            onDone={(session: Session) => {
              setState({ ...state, loading: true })
              if (authUser.id) {
                saveSession(session, authUser.id).then(() => {
                  localStorage.setItem("subNavState", SubNavState.notStarted)
                  localStorage.setItem("finishMs", "")
                  localStorage.setItem("minutes", "")
                  setState(improveInitialState)
                })
              } else {
                console.error("no user id, cant save session")
              }
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
