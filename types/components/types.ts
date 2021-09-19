import { Section } from '../../utils/session'

export interface SessionProps {
  sections: Section[]
  totalDuration: number
}

export interface SkillDescriptionItemProps {
  skillName: string
  codes: {
    name: string;
    code: string;
  }[]
}

export interface RLCodeProps {
  children: string
}
