export enum SectionType {
  simple,
  training,
}

interface Training {
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
  trainings: Training[]
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

function freeTrainingSection(duration: number): SimpleSection {
  return {
    type: SectionType.simple,
    name: "Entrenamiento libre",
    duration: duration,
  }
}

function trainingSection(duration: number, amount: number): TrainingSection {
  return {
    type: SectionType.training,
    name: "Entrenamiento libre",
    duration: duration,
    trainings: getRecommendedTrainings(amount),
  }
}

function casualSection(duration: number): SimpleSection {
  return {
    type: SectionType.simple,
    name: "Partidas casuales",
    duration: duration,
  }
}

function competitiveSection(duration: number): SimpleSection {
  return {
    type: SectionType.simple,
    name: "Partidas competitivas",
    duration: duration,
  }
}

function reviewSection(duration: number): SimpleSection {
  return {
    type: SectionType.simple,
    name: "Revisión de partidas jugadas",
    duration: duration,
  }
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

function randomSession(): Session {
  return buildSession(Math.floor(Math.random() * 100))
}

export function randomCompletedSession(): CompletedSession {
  return {
    id: "id",
    userId: "id",
    date: randomDate(new Date(2012, 0, 1), new Date()).toISOString(),
    session: randomSession(),
  }
}

function getRecommendedTrainings(n: number): Training[] {
  const shuffledTrainings = shuffle(bestTrainings)
  const length = shuffledTrainings.length
  const end = n < length ? n : length
  return shuffledTrainings.slice(0, end)
}

const shooting: Training[] = [
  {
    name: "Shots you shouldn't miss",
    code: "42BF-686D-E047-574B",
  },
  {
    name: "Shooting consistency",
    code: "4912-A5C9-9A56-555D",
  },
  {
    name: "Ground shots",
    code: "6EB1-79B2-33B8-681C",
  },
]

const defending: Training[] = [
  {
    name: "Shadow defence",
    code: "5CCE-FB29-7B05-A0B1",
  },
  {
    name: "Overhead goalie #2",
    code: "17F2-309A-8FA5-13BE",
  },
  {
    name: "Uncomfortable saves",
    code: "5CB2-6D82-1B54-47B7",
  },
]

const aerialControl: Training[] = [
  {
    name: "Air dribbles",
    code: "9D87-258C-3C05-6FA9",
  },
  {
    name: "Double tap playground",
    code: "CAFC-FB3E-3C0F-B8F1",
  },
  {
    name: "Double jump aerials",
    code: "F269-B159-0BAC-AC2E",
  },
]

const redirects: Training[] = [
  {
    name: "Cherry Picker",
    code: "D1F1-6096-8D71-F963",
  },
  {
    name: "Redirect Pack #2",
    code: "48ED-86F3-89A6-50F8",
  },
  {
    name: "Redirects mechanic warm-up",
    code: "42B5-985A-EF76-12A1",
  },
]

const overall: Training[] = [
  {
    name: "SubparbuinHD",
    code: "E8DF-CA1A-DBEA-0C8F",
  },
  {
    name: "Mertzy's freestyle academy",
    code: "9DC5-D1F5-4EE0-7195",
  },
  {
    name: "Ultimate warm-up",
    code: "FA24-B2B7-2E8E-193B",
  },
]

const bestTrainings: Training[] = [
  ...shooting,
  ...defending,
  ...aerialControl,
  ...redirects,
  ...overall,
]

function shuffle(arr: Array<any>): Array<any> {
  let len = arr.length
  const d = len
  const array = []
  let k, i
  for (i = 0; i < d; i++) {
    k = Math.floor(Math.random() * len)
    array.push(arr[k])
    arr.splice(k, 1)
    len = arr.length
  }
  for (i = 0; i < d; i++) {
    arr[i] = array[i]
  }
  return arr
}

export function buildSession(minutes: number): Session {
  let sections: Section[]
  if (minutes <= 15) {
    sections = [freeTrainingSection(minutes)]
  } else if (minutes <= 30) {
    sections = [
      freeTrainingSection(minutes * 0.4),
      competitiveSection(minutes * 0.6),
    ]
  } else {
    sections = [
      freeTrainingSection(minutes * 0.1),
      trainingSection(minutes * 0.25, 2),
      casualSection(minutes * 0.1),
      competitiveSection(minutes * 0.4),
      reviewSection(minutes * 0.15),
    ]
  }

  return {
    duration: minutes,
    sections: sections,
  }
}
