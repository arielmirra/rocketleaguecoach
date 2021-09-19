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

export interface Session {
  sections: Section[]
  duration: number
}

export interface CompletedSession {
  id: string
  userId: string
  session: Session
  date: string
}

export function buildSession(minutes: number): Session {
  let sections: Section[]
  if (minutes <= 15) {
    sections = [
      {
        type: SectionType.simple,
        name: "Entrenamiento libre",
        duration: minutes,
      },
    ]
  } else if (minutes <= 30) {
    sections = [
      {
        type: SectionType.simple,
        name: "Entrenamiento libre",
        duration: minutes * 0.4,
      },
      {
        type: SectionType.simple,
        name: "Partidas competitivas",
        duration: minutes * 0.6,
      },
    ]
  } else {
    sections = mockSections(minutes).sections
  }

  return {
    duration: minutes,
    sections: sections,
  }
}

export default function mockSections(minutes: number): Session {
  const fractions = [0.1, 0.25, 0.1, 0.4, 0.15]
  const sections: Section[] = [
    {
      type: SectionType.simple,
      name: "Entrenamiento libre",
      duration: fractions[0] * minutes,
    },
    {
      type: SectionType.training,
      name: "Entrenamiento",
      codes: [
        {
          name: "0aaaa0123kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas",
          code: "NOTO-0934-IE03-MBZK",
        },
        {
          name: "Positional taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaactics",
          code: "J19Y-H6XN-LA1S-KCHS",
        },
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
      name: "Partidas competitivas",
      duration: fractions[3] * minutes,
    },
    {
      type: SectionType.simple,
      name: "Revision",
      duration: fractions[4] * minutes,
    },
  ]

  return {
    duration: minutes,
    sections: sections,
  }
}

function randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
  }

export function randomSession(): Session {
    return buildSession(Math.floor(Math.random() * 100))
}

export function randomCompletedSession(): CompletedSession {
    return {
        id: "dasdsadsadsa",
        userId: "dasdsadsad",
        date: randomDate(new Date(2012, 0, 1), new Date()).toISOString(),
        session: randomSession(),
      }
}
