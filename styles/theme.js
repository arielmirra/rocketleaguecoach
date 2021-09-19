import { createTheme } from "@mui/material"

export const breakpoints = {
  mobile: "520px",
}

export const fonts = {
  base: "Helvetica, Arial, sans-serif",
}

export const colors = {
  black: "#000000",
  white: "#ffffff",
  lightGray: "#c5c5c5",
  darkGray: "#949494",
  primary: "#023E8A",
  secondary: "#0077B6",
  red: "#dc0000",
}

export const verticalProgressBarColors = [
  "#FDCA40",
  "#299de3",
  "#5D2E8C",
  "#CC2B2B",
  "#00AF54",
]

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.red,
    },
    background: {
      default: colors.white,
    },
  },
})
