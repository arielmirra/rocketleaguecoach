import { List, ListItem, Typography } from "@mui/material"
import { skillDescriptionItemStyles } from "../../styles/components/styles"
import { SkillDescriptionItemProps } from "../../types/components/types"
import RLCodeText from "./RLCodeText"

const SkillDescriptionItem = (
  props: SkillDescriptionItemProps
): React.ReactElement => {
  return (
    <>
      <div className="skill-description-item">
        <Typography variant="h6">{props.skillName}</Typography>
        <List>
          {props.codes.map((code, i) => (
            <ListItem key={`${props.skillName.toLowerCase()}-code-${i}`}>
              <Typography>{code.name}</Typography>
              <RLCodeText>{code.code}</RLCodeText>
            </ListItem>
          ))}
        </List>
      </div>
      <style jsx>{skillDescriptionItemStyles}</style>
    </>
  )
}

export default SkillDescriptionItem
