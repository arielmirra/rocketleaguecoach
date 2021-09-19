
import { Typography } from "@mui/material"
import { useEffect } from "react"
import { RLCodeTextStyles } from "../../styles/components/styles"
import { RLCodeProps } from "../../types/components/types"


const RLCodeText = (props: RLCodeProps): React.ReactElement => {
  useEffect(() => {
    if (typeof navigator === "undefined") {
      console.log("navigator is defined")
    } else {
      console.log("navigator is NOT defined")
    }
  }, [])
  return (
    <div onClick={() => navigator.clipboard.writeText(props.children)}>
      <Typography sx={RLCodeTextStyles}>{props.children}</Typography>
    </div>
  )
}

export default RLCodeText