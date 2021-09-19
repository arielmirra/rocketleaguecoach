import { Typography } from "@mui/material"
import { useFormik } from "formik"
import { MatButton, MatInput } from "../../../hooks/formik"
import * as Yup from "yup"
import { hoursInputStyle, notStartedStyles } from "../../../styles/improve/styles"

interface NotStartedProps {
  onStart: (minutes: number, startMs: number) => void
}

const NotStarted = ({ onStart }: NotStartedProps) => {
  const formik = useFormik({
    initialValues: {
      hours: "",
      minutes: "",
    },
    validationSchema: Yup.object().shape(
      {
        hours: Yup.number().min(0).when("minutes", {
          is: (minutes: string) => !minutes || minutes.length === 0,
          then: Yup.number().min(0).required(),
          otherwise: Yup.number().min(0),
        }),
        minutes: Yup.number().min(0).when("hours", {
          is: (hours: string) => !hours || hours.length === 0,
          then: Yup.number().min(0).required(),
          otherwise: Yup.number().min(0),
        }),
      },
      [["hours", "minutes"]]
    ),
    onSubmit: (values) => {
      onStart(
        (parseInt(values.hours) || 0) * 60 + (parseInt(values.minutes) || 0),
        new Date().getTime()
      )
    },
  })

  return (
    <div className="improve-not-started-container">
      <Typography variant="h5">Nueva sesión</Typography>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-inputs">
          <MatInput
            formik={formik}
            inputId="hours"
            suffix="hs"
            sx={hoursInputStyle}
            type="number"
            />
          <MatInput
            formik={formik}
            inputId="minutes"
            suffix="m"
            type="number"
          />
        </div>
        <MatButton text="Entrenar!" type="submit" size="large" />
      </form>

      <style jsx>{notStartedStyles}</style>
    </div>
  )
}

export default NotStarted
