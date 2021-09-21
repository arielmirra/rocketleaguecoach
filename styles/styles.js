import css from "styled-jsx/css"

import { breakpoints, fonts } from "./theme"

const backgroundUrl =
  "https://steamuserimages-a.akamaihd.net/ugc/80339917954151566/3CB9761163B46FC5F38B822CCD28E7AE9AEFBAB5/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"

export const globalStyles = css.global`
  html,
  body {
    background: url(${backgroundUrl});
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    overscroll-behavior-y: none;
    position: fixed;
    height: 100%;
    width: 100%;
  }

  div#__next,
  div#__next > div {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`

export const globalPadding = "20px"

export default css`
  .main-container {
    display: grid;
    height: 100%;
    place-items: center;
    overflow: hidden;
  }

  main {
    background: #fff;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    flex: 1;
    height: 100vh;
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 95vh;
      width: ${breakpoints.mobile};
    }
  }

  header {
    align-items: center;
    justify-content: center;
    background: #ffffffaa;
    backdrop-filter: blur(5px);
    border-bottom: 1px solid #eee;
    height: 49px;
    display: flex;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 999;
  }

  #content {
    height: 100%;
    width: 100%;
    padding: ${globalPadding};
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  h2 {
    font-size: 21px;
    font-weight: 800;
    padding-left: 15px;
  }

  nav {
    background: #fff;
    bottom: 0;
    border-top: 1px solid #eee;
    display: flex;
    height: 49px;
    width: 100%;
  }
`
