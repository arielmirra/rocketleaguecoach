import css from 'styled-jsx/css';

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
    padding-top: 20px;
    height: 100%;
  }
  .floating-icon-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .improve-training-container > .content-container {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    width: 100%;
    height: 50vh;
    padding: 30px 0;
  }
  .improve-training-container
    > .content-container
    > .skills-codes-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    margin-left: 20px;
  }
`;

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

export const notStartedStyles = css`
  .improve-not-started-container {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
  .improve-container > form {
  }
  .improve-container > form > .MuiTextField-root {
    margin-bottom: 30px;
  }
`
