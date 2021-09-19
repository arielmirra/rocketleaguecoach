import css from 'styled-jsx/css';
import { colors } from "../../styles/theme"

/**
 * Session component
 */
export const sessionStyles = css`
  .session  {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top: 20px;
  }

  .session > .title {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .session > .sections {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    width: 100%;
    padding: 30px 0;
  }

  .session > .sections > .section-container {
    display: flex;
    flex-flow: row nowrap;
  }

  .session > .sections > .section-container > .progress-bar {
    min-width: 50px;
  }

  .session > .sections > .section-container:first-child > .progress-bar {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }

  .session > .sections > .section-container:last-child > .progress-bar {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  .session > .sections > .section-container > .duration {
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 60px;
    min-width: 60px;
  }

  .session > .sections > .section-container > .texts-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    overflow-x: auto;
    padding-left: 16px;
    border-left: 1px solid #c5c5c5;
  }

  .session > .sections > .section-container > .texts-container > .codes-container > .code {
    display: flex;
    flex-flow: row nowrap;
    margin-left: 20px;
    margin-top: 5px;
  }
`

export const RLCodeTextStyles: any = {
  borderRadius: "3px",
  padding: "0 4px",
  backgroundColor: colors.primary,
  color: colors.white,
  whiteSpace: "nowrap",
}
