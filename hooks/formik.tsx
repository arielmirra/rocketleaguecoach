import React from "react"
import {
  Button,
  ButtonProps,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  TextField,
} from "@mui/material"

interface BaseProps {
  formik: any
  inputId: string
  label?: string
  suffix?: string
}

export const MatTextField = ({
  formik,
  inputId,
  label,
  ...props
}: BaseProps) => {
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

type MatInputProps = BaseProps & OutlinedInputProps

export const MatInput = ({
  formik,
  inputId,
  suffix,
  ...rest
}: MatInputProps) => {
  return (
    <OutlinedInput
      fullWidth
      id={inputId}
      name={inputId}
      // label={label}
      placeholder={formik.values[inputId].toString()}
      value={formik.values[inputId]}
      onChange={formik.handleChange}
      error={formik.touched[inputId] && Boolean(formik.errors[inputId])}
      endAdornment={<InputAdornment position="end">{suffix}</InputAdornment>}
      // helperText={formik.touched[inputId] && formik.errors[inputId]}
      {...rest}
    />
  )
}

export const MatCheckbox = ({
  formik,
  inputId,
  label,
  ...props
}: BaseProps) => {
  return <></>
}

export const MatSelect = ({ formik, inputId, label, ...props }: BaseProps) => {
  return <></>
}

interface MatButtonProps extends ButtonProps {
  text: string
  loading?: boolean
}

export const MatButton = ({
  text,
  loading,
  ...rest
}: MatButtonProps): React.ReactElement => {
  return (
    <Button color="primary" variant="contained" fullWidth {...rest}>
      {loading ? <CircularProgress size={24} /> : text}
    </Button>
  )
}
