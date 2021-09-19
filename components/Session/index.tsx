import { sessionStyles } from "../../styles/components/styles"
import { SessionProps } from "../../types/components/types"
import { inTrainingMockData } from "../../utils/improve/utils"
import SkillDescriptionItem from "./SkillDescriptionItem"
import VerticalProgressBar from "./VerticalProgressBar"

const Session = (props: SessionProps): React.ReactElement => {

  return (
    <>
      <div className="content-container">
        <VerticalProgressBar sections={props.sections} totalDuration={props.totalDuration}/>
        <div className="skills-codes-container">
          {inTrainingMockData.mockSkills.map((skill) => {
            return (
              <SkillDescriptionItem
                key={`skill-${skill.id}`}
                skillName={skill.skillName}
                codes={skill.codes}
              />
            )
          })}
        </div>
      </div>
      <style jsx>{sessionStyles}</style>
    </>
  )
}

export default Session