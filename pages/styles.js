import css from "styled-jsx/css"

import { breakpoints, colors, fonts } from "../styles/theme"

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
    flex: 1;
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
  }

  #body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  #content {
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
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

  nav a {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    justify-content: center;
  }

  nav a:hover {
    background: radial-gradient(${colors.primary}22 15%, transparent 16%);
    background-size: 180px 180px;
    background-position: center;
  }

  nav a:hover > :global(svg) {
    stroke: ${colors.primary};
  }
`
