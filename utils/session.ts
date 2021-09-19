
enum SectionType {
  freeplay,
  training,
  casual,
  competitive,
  review,
}

interface RLCode {
  name: string
  code: string
}

export interface SimpleSection {
  name: string
  type: SectionType
  duration: number
}

export interface TrainingSection extends SimpleSection {
  type: SectionType.training
  codes: RLCode[]
}

export type Section = SimpleSection | TrainingSection


export default function buildSession(ms: number): Section[] {


  return []
}
