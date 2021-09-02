import css from "styled-jsx/css"

import { breakpoints, fonts } from "../../styles/theme"

const backgroundUrl =
  "https://steamuserimages-a.akamaihd.net/ugc/80339917954151566/3CB9761163B46FC5F38B822CCD28E7AE9AEFBAB5/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"

export const globalStyles = css.global`
  html,
  body {
    background: url(${backgroundUrl});
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    position: relative;
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
