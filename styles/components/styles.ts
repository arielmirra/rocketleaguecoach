import css from 'styled-jsx/css';
import { colors } from "../theme"

/**
 * Session component
 */
export const sessionStyles = css`
  .content-container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    padding: 30px 0;
  }

  .content-container > .section-container {
    display: flex;
    flex-flow: row nowrap;
  }

  .content-container > .section-container > .progress-bar {
    min-width: 50px;
  }

  .content-container > .section-container > .duration {
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 100px;
  }

  .content-container > .section-container > .texts-container {
    display: flex;
    flex-flow: column nowrap;
    overflow-x: auto;
    padding-top: 8px;
  }

  .content-container > .section-container > .texts-container > .codes-container > .code {
    display: flex;
    flex-flow: row nowrap;
    margin-left: 20px;
  }
`

export const verticalProgressBarStyles = css`
`;

export const skillDescriptionItemStyles = css`
`;

export const RLCodeTextStyles: any = {
  borderRadius: "3px",
  padding: '0 4px',
  backgroundColor: colors.primary,
  color: colors.white,
  whiteSpace: 'nowrap',
}
