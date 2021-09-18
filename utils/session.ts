
enum SectionType {
  freeplay,
  training,
  casual,
  competitive,
  review,
}

export interface SimpleSection {
  type: SectionType
  duration: number
}

export interface TrainingSection extends SimpleSection {
  codes: string[]
}

export type Section = SimpleSection | TrainingSection


export default function buildSession(ms: number): Section[] {


  return []
}
