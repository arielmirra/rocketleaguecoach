import { FullTime } from "../../types/improve/types";
import { Session } from "../../utils/session"

export interface SessionProps {
  fullTime: FullTime
  session: Session
  completedSession?: {
    date: string
  }
  style?: any
}

export interface RLCodeProps {
  children: string
}
