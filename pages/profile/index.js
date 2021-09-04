import useUser from "../../hooks/useUser"
import { useFormik } from "formik"
import * as Yup from "yup"
import React from "react"
import Avatar from "../../components/Avatar"
import { getEpicIds, setEpicId } from "../../firebase/client"
import { MatButton, MatTextField } from "../../hooks/formik"
import { Button, TextField } from "@material-ui/core"

export default function ProfilePage() {
  const user = useUser()

  const formik = useFormik({
    initialValues: {
      epicId: "",
    },
    // validationSchema: Yup.object({
    //   epicId: Yup.string().required("Required"),
    // }),
    onSubmit: (values) => {
      setEpicId(user.uid, values.epicId)
      getEpicIds(user.uid).then((db) => console.log(db))
      // console.log(getEpicIds(user.uid))
    },
  })

  return (
    <>
      <Avatar width={100} />
      <form onSubmit={formik.handleSubmit}>
        <MatTextField inputId="epicId" formik={formik} label="Epic ID" />
        <MatButton text="GUARDAR EPIC ID" type="submit" />
      </form>
      <style jsx>{`
        form {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
