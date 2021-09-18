export type ImproveState = {
  subNavState: SubNavState
  startMs: number
  finishMs: number
  hours: number
}

export enum SubNavState {
  notStarted = "notStarted",
  inTraining = "inTraining",
}

export interface NotStartedProps {
  onStart: (hours: number, startMs: number) => void
}

export type InTrainingProps = {
  finishMs: number
  hours: number
  onCancel: () => void
  onDone: (newSessionData: any) => void
}

export type RLCodeProps = {
  children: string
}

/**
 * Hooks types
 */
export type CountdownProps = {
  finishMs: number
}

export type CountdownResult = {
  seconds: number
  minutes: number
  hours: number
}
