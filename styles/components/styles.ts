import css from 'styled-jsx/css';
import { colors } from "../../styles/theme"

/**
 * Session component
 */
export const sessionStyles = css`
  .content-container {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    width: 100%;
    height: 50vh;
    padding: 30px 0;
  }
  .content-container > .skills-codes-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    margin-left: 20px;
  }
`

export const verticalProgressBarStyles = css`
  .vertical-progress-bar {
    display: flex;
    flex-flow: row nowrap;
    margin: 10px;
  }
  .vertical-progress-bar > .progress-bar {
    height: 100%;
    width: 50px;
    background-color: #949494;
  }
  .vertical-progress-bar > .durations {
    height: 100%;
  }   
`;

export const skillDescriptionItemStyles = css`
  .skill-description-item {
  }
`;

export const RLCodeTextStyles: any = {
  borderRadius: "3px",
  padding: '0 4px',
  backgroundColor: colors.primary,
  color: colors.white,
  whiteSpace: 'nowrap',
}
