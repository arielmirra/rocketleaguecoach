import Typography from "@mui/material/Typography"
import { useFormik } from "formik"
import { MatButton, MatInput } from "../../../hooks/formik"
import * as Yup from "yup"
import { hoursInputStyle } from "../../../styles/improve/styles"
import Improve from "../../../components/Icons/Improve"

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
        hours: Yup.number()
          .min(0)
          .when("minutes", {
            is: (minutes: string) => !minutes || minutes.length === 0,
            then: Yup.number().min(0).required(),
            otherwise: Yup.number().min(0),
          }),
        minutes: Yup.number()
          .min(0)
          .when("hours", {
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
    <>
      <div className="not-started-container">
        <Improve width={128} height={128} />
        <Typography variant="h4" align={"center"} mt={5} mb={5}>
          Nueva sesión de entrenamiento
        </Typography>
        <Typography variant="h5" align={"center"} mt={5} mb={5}>
          ¿Cuánto tiempo tienes para entrenar?
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className="text-inputs">
            <MatInput
              formik={formik}
              inputId="hours"
              suffix="hs"
              sx={hoursInputStyle}
              type="number"
              inputProps={{ min: 0 }}
            />
            <MatInput
              formik={formik}
              inputId="minutes"
              suffix="m"
              type="number"
              inputProps={{ min: 0 }}
            />
          </div>
          <MatButton text="¡Comenzar!" type="submit" size="large" />
        </form>
      </div>
      <style jsx>{`
        .not-started-container {
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: center;
        }

        .not-started-container > form > .text-inputs {
          display: flex;
          flex-flow: row nowrap;
          margin-bottom: 30px;
        }
      `}</style>
    </>
  )
}

export default NotStarted
