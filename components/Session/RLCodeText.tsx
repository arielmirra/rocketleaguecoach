import Typography from "@mui/material/Typography"
import { RLCodeTextStyles } from "./styles"

interface RLCodeProps {
  children: string
}

const RLCodeText = ({ children }: RLCodeProps) => {
  // TODO: add functionality to copy to clipboard on click
  // useEffect(() => {
  //   if (typeof navigator === "undefined") {
  //     console.log("navigator is defined")
  //   } else {
  //     console.log("navigator is NOT defined")
  //   }
  // }, [])

  return (
    // <div onClick={() => navigator.clipboard.writeText(children)}>
    <div>
      <Typography sx={RLCodeTextStyles}>{children}</Typography>
    </div>
  )
}

export default RLCodeText
