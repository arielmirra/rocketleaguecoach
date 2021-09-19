import { Typography } from "@mui/material"
import { sessionStyles } from "../../styles/components/styles"
import { verticalProgressBarColors } from "../../styles/theme"
import { SessionProps } from "../../types/components/types"
import { SectionType } from "../../utils/session"
import RLCodeText from "./RLCodeText"

const Session = (props: SessionProps): React.ReactElement => {

  return (
    <>
      <div className="content-container">
        {props.sections.map((section, i) => {
          return (
            <div className='section-container' key={`section-${i}`} style={{height: `${section.duration / props.totalDuration * 100}%`}}>
              <div
                className='progress-bar'
                style={{backgroundColor: verticalProgressBarColors[i]}}
              />
              <div className='duration'>
                <Typography>{`${section.duration}m`}</Typography>
              </div>
              <div className='texts-container'>
                <Typography>{section.name}</Typography>
                {section.type === SectionType.training && (
                  <div className='codes-container'>
                    {section.codes.map((code, j) => (
                      <div className='code' key={`code-${j}`}>
                        <Typography>{code.name}</Typography>
                        <RLCodeText>{code.code}</RLCodeText>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <style jsx>{sessionStyles}</style>
    </>
  )
}

export default Session
