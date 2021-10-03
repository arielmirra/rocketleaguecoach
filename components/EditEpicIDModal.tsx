import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { MatTextField } from "../hooks/formik"
import React from "react"

interface EditEpicIDModalProps {
  isOpen: boolean
  onClose: () => void
  submitting: boolean
  formik: any
}

function EditEpicIDModal({
  isOpen,
  onClose,
  submitting,
  formik,
}: EditEpicIDModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Ingresá tu Epic ID</DialogTitle>
      <DialogContent>
        {submitting ? (
          <div className="center-content">
            <CircularProgress />
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <MatTextField inputId="epicID" formik={formik} label="Epic ID" />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={submitting}>
          Cancelar
        </Button>
        <Button
          onClick={formik.submitForm}
          color="primary"
          autoFocus
          disabled={submitting}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditEpicIDModal
