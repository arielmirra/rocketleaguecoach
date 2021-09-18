import React from "react"
import { Button, TextField } from "@mui/material"

interface Props {
  formik: any
  inputId: string
  label: string
}

export const MatTextField = ({ formik, inputId, label, ...props }: Props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      id={inputId}
      name={inputId}
      label={label}
      placeholder={formik.values[inputId]}
      value={formik.values[inputId]}
      onChange={formik.handleChange}
      error={formik.touched[inputId] && Boolean(formik.errors[inputId])}
      helperText={formik.touched[inputId] && formik.errors[inputId]}
      {...props}
    />
  )
}

export const MatCheckbox = ({ formik, inputId, label, ...props }: Props) => {
  return <></>
}

export const MatSelect = ({ formik, inputId, label, ...props }: Props) => {
  return <></>
}

export const MatButton = ({ text, ...props }: any) => {
  return (
    <Button color="primary" variant="contained" fullWidth {...props}>
      {text}
    </Button>
  )
}
