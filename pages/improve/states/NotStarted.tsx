import { Typography } from "@mui/material"
import { useFormik } from "formik"
import { MatTextField, MatButton } from "../../../hooks/formik"
import * as Yup from "yup"
import { NotStartedProps } from "../../../types/improve/types"
import { notStartedStyles } from "../../../styles/improve/styles"

export default function NotStarted(props: NotStartedProps) {
  const formik = useFormik({
    initialValues: {
      hours: "",
    },
    validationSchema: Yup.object({
      hours: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      props.onStart(parseInt(values.hours), new Date().getTime())
    },
  })

  return (
    <div className="improve-not-started-container">
      <Typography variant="h5">Nueva sesión</Typography>
      <form onSubmit={formik.handleSubmit}>
        <MatTextField formik={formik} inputId="hours" label="" />
        <MatButton text="Entrenar!" type="submit" size="large" />
      </form>

      <style jsx>{notStartedStyles}</style>
    </div>
  )
}
