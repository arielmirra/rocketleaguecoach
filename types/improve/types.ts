export type ImproveState = {
  subNavState: SubNavState
  startMs: number
  finishMs: number
  minutes: number
  loading: boolean
}

export enum SubNavState {
  notStarted = "notStarted",
  inTraining = "inTraining",
}

export interface NotStartedProps {
  onStart: (minutes: number, startMs: number) => void
}

export type InTrainingProps = {
  finishMs: number
  minutes: number
  onCancel: () => void
  onDone: (newSessionData: any) => void
}

/**
 * Hooks types
 */
export type CountdownProps = {
  finishMs: number
}

export type FullTime = {
  seconds: number
  minutes: number
  hours: number
}
