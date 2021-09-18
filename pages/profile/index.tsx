import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { getEpicIDFromId, saveEpicID } from "../../firebase/client"
import { MatButton, MatTextField } from "../../hooks/formik"
import {
  Grid,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material"
import { Create as CreateIcon } from "@mui/icons-material"
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import Loader from "../../components/Loader"
import { TrackerStats } from "../../models/Tracker"
import { makeStyles } from "@mui/styles"
import LifetimeStatsCards from "../../components/LifetimeStatsCards"

const useStyles = makeStyles({
  large: {
    height: "100px",
    width: "100px",
  },
})

async function getTrackerStats(epicID: string) {
  if (epicID) {
    const proxy = "https://intense-beyond-50191.herokuapp.com/"
    const api =
      "https://api.tracker.gg/api/v2/rocket-league/standard/profile/epic/"
    const res = await fetch(proxy + api + epicID, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.58 Safari/537.36",
      },
    })
    const data = await res.json()
    if (res.status === 404) {
      return { notFound: true }
    } else return data
  } else return null
}

const ProfilePage = () => {
  const AuthUser = useAuthUser()
  const classes = useStyles()
  const [isModalOpen, setModalOpened] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [epicID, setEpicID] = useState("")
  const [stats, setStats] = useState<TrackerStats>({ segments: [] })

  useEffect(() => {
    getEpicIDFromId(AuthUser.id).then((id) => {
      setEpicID(id)
      getTrackerStats(id).then((data) => {
        const statistics: TrackerStats = data.data
        console.log(statistics)
        console.log(statistics.segments)
        setStats(statistics)
      })
    })
  }, [])

  const closeModal = () => setModalOpened(false)
  const openModal = () => setModalOpened(true)

  const formik = useFormik({
    initialValues: {
      epicID: epicID ?? "",
    },
    onSubmit: async (values) => {
      setSubmitting(true)
      setEpicID(values.epicID)
      saveEpicID(AuthUser.id, values.epicID)
      closeModal()
      setSubmitting(false)
    },
  })

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid container item xs={4} justifyContent="center">
          <Avatar
            className={classes.large}
            alt={AuthUser.displayName || ""}
            src={
              AuthUser.photoURL ||
              "https://randomuser.me/api/portraits/lego/5.jpg"
            }
            title={AuthUser.displayName || ""}
          />
        </Grid>
        <Grid item xs={8} container direction="column" justifyContent="center">
          <Typography variant="h5">{AuthUser.displayName}</Typography>
          {epicID && (
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6">{epicID}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={openModal}>
                  <CreateIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      {!epicID && (
        <div id="save-epic-id" className="center-content">
          <MatButton onClick={openModal} text="Ingresá tu Epic ID" />
        </div>
      )}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
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
          <Button onClick={closeModal} color="primary" disabled={submitting}>
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
      <div className="stat-cards">
        {stats.segments.length ? (
          <LifetimeStatsCards segment={stats.segments[0]} />
        ) : (
          <div className="center-content">
            <CircularProgress />
          </div>
        )}
      </div>
      <style jsx>{`
        #save-epic-id {
          flex: 1;
          flex-direction: column;
        }

        .center-content {
          display: flex;
          place-content: center;
        }

        .stat-cards {
          padding: 20px 0;
        }
      `}</style>
    </>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(ProfilePage)
