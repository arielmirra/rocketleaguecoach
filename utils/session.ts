
export enum SectionType {
  simple,
  training,
}

interface RLCode {
  name: string
  code: string
}

interface BaseSection {
  name: string
  duration: number
}
export interface SimpleSection extends BaseSection {
  type: SectionType.simple
}

export interface TrainingSection extends BaseSection {
  type: SectionType.training
  codes: RLCode[]
}

export type Section = SimpleSection | TrainingSection


const fractions = [0.1, 0.25, 0.1, 0.4, 0.15]
export default function buildSession(minutes: number): Section[] {
  return ([
    {
      type: SectionType.simple,
      name: "Entrenamiento libre",
      duration: fractions[0] * minutes,
    },
    {
      type: SectionType.training,
      name: "Entrenamiento",
      codes: [
        { name: "0aaaa0123kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas", code: "NOTO-0934-IE03-MBZK" },
        { name: "Positional taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaactics", code: "J19Y-H6XN-LA1S-KCHS" },
        // { name: "Positions 101", code: "1J8V-SH9W-N23O-2O83" },
        // { name: "General-precision", code: "SD02-FGHJ-31J4-XMAL" },
      ],
      duration: fractions[1] * minutes,
    },
    {
      type: SectionType.simple,
      name: "Partidas casual",
      duration: fractions[2] * minutes,
    },
    {
      type: SectionType.simple,
      name: "Partidas competitivos",
      duration: fractions[3] * minutes,
    },
    {
      type: SectionType.simple,
      name: "Revision",
      duration: fractions[4] * minutes,
    },
  ])

  return []
}
