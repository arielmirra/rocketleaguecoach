import useUser from "../../hooks/useUser"
import { useFormik } from "formik"
import * as Yup from "yup"
import React from "react"
import { Button, TextField } from "@material-ui/core"
import Avatar from "../../components/Avatar"
import { setEpicId } from "../../firebase/client"

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
    },
  })

  return (
    <>
      <Avatar width={100} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          id="epicId"
          name="epicId"
          label="Epic ID"
          placeholder={formik.values.epicId}
          value={formik.values.epicId}
          onChange={formik.handleChange}
          error={formik.touched.epicId && Boolean(formik.errors.epicId)}
          helperText={formik.touched.epicId && formik.errors.epicId}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={false}
        >
          Guardar Epic ID
        </Button>
      </form>
      <style jsx>{`
        form {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
