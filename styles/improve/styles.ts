import css from "styled-jsx/css"

export const improvePageStyles = css`
  .improve-container {
    height: 100%;
    width: 100%;
  }
`

export const inTrainingStyles = css`
  .improve-training-container {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    height: 100%;
  }
  .floating-icon-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`

export const notStartedStyles = css`
  .improve-not-started-container {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  .improve-not-started-container > form > .text-inputs {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 30px;
  }
`
export const hoursInputStyle: any = {
  marginRight: '8px',
}

export const closeButtonStyles: any = {
    position: "absolute",
    top: "10px",
    left: "10px",
}
