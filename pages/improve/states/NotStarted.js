import { Typography } from "@mui/material"
import { useFormik } from "formik"
import { MatTextField, MatButton } from "hooks/formik"
import * as Yup from "yup"

export default function NotStartedSubPage({ onStart }) {
  const formik = useFormik({
    initialValues: {
      hours: "",
    },
    validationSchema: Yup.object({
      hours: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      onStart(parseInt(values.hours), new Date().getTime())
    },
  })

  return (
    <div className="improve-not-started-container">
      <Typography variant="h5">Nueva sesión</Typography>
      <form onSubmit={formik.handleSubmit}>
        <MatTextField formik={formik} inputId="hours" label="" />
        <MatButton text="Entrenar!" type="submit" size="large" />
      </form>

      <style jsx>{`
        .improve-not-started-container {
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: center;
        }
        .improve-container > form {
        }
        .improve-container > form > .MuiTextField-root {
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  )
}
