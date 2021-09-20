import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { getEpicIDFromId, saveEpicID } from "../../firebase/client"
import { MatButton, MatTextField } from "../../hooks/formik"
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { Create as CreateIcon } from "@mui/icons-material"
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import Loader from "../../components/Loader"
import {
  OverviewSegment,
  PlaylistSegment,
  Rank,
  Segment,
  TrackerStats,
} from "../../models/Tracker"
import LifetimeStatsCards from "../../components/LifetimeStatsCards"
import RankBoard from "../../components/RankBoard"
import { globalPadding } from "../../styles/styles"
import * as RemoteData from "../../models/RemoteData"

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

interface HeaderProps {
  name: string | null
  photoURL: string | null
  epicID: RemoteData.RemoteData<string>
  onEditEpicID: () => void
}

function Header({ name, photoURL, epicID, onEditEpicID }: HeaderProps) {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid container item xs={4} justifyContent="center">
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt={name || ""}
          src={photoURL || ""}
          title={name || ""}
        />
      </Grid>
      <Grid item xs={8} container direction="column" justifyContent="center">
        <Typography variant="h5">{name}</Typography>
        {epicID.state === "present" && epicID.data && (
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h6">{epicID.data}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onEditEpicID}>
                <CreateIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

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

const ProfilePage = () => {
  const AuthUser = useAuthUser()
  const [isModalOpen, setModalOpened] = useState(false)
  const [epicID, setEpicID] = useState<RemoteData.RemoteData<string>>(
    RemoteData.notAsked()
  )
  const [stats, setStats] = useState<RemoteData.RemoteData<TrackerStats>>(
    RemoteData.notAsked()
  )

  const getSavedEpicId = async () => {
    setEpicID(RemoteData.loading())
    const epicID = await getEpicIDFromId(AuthUser.id || "")
    setEpicID(RemoteData.present(epicID))
    formik.values.epicID = epicID
  }

  const fetchStats = async (epicID: string) => {
    setStats(RemoteData.loading())
    const data = await getTrackerStats(epicID)
    const statistics: TrackerStats = data.data
    setStats(RemoteData.present(statistics))
  }

  useEffect(() => {
    getSavedEpicId()
  }, [])

  useEffect(() => {
    if (epicID.state === "present") {
      if (epicID.data) {
        fetchStats(epicID.data)
      } else {
        setStats(RemoteData.notAsked())
      }
    }
  }, [epicID])

  const closeModal = () => setModalOpened(false)
  const openModal = () => setModalOpened(true)

  const formik = useFormik({
    initialValues: {
      epicID: "",
    },
    onSubmit: async (values) => {
      setEpicID(RemoteData.loading())
      await saveEpicID(AuthUser.id, values.epicID)
      closeModal()
      setEpicID(RemoteData.present(values.epicID))
    },
  })

  return (
    <>
      <Header
        name={AuthUser.displayName}
        photoURL={AuthUser.photoURL}
        epicID={epicID}
        onEditEpicID={openModal}
      />
      {epicID.state === "present" && epicID.data === "" && (
        <div className="center-content">
          <MatButton onClick={openModal} text="Ingresá tu Epic ID" />
        </div>
      )}
      {stats.state === "present" && <GotStatsState stats={stats.data} />}
      {(stats.state === "loading" || epicID.state === "loading") && (
        <div className="center-content">
          <CircularProgress />
        </div>
      )}
      <EditEpicIDModal
        isOpen={isModalOpen}
        onClose={closeModal}
        submitting={epicID.state === "loading"}
        formik={formik}
      />
      <style jsx>{`
        #save-epic-id {
          flex: 1;
          flex-direction: column;
        }

        .center-content {
          display: flex;
          place-content: center;
          align-items: center;
          height: 100%;
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

interface GotStatsStateProps {
  stats: TrackerStats
}

function getRankedData(segments: Segment[]) {
  const versus1 = segments.find(
    (s) => s.type === "playlist" && s.metadata.name === "Ranked Duel 1v1"
  ) as PlaylistSegment
  const versus2 = segments.find(
    (s) => s.type === "playlist" && s.metadata.name === "Ranked Doubles 2v2"
  ) as PlaylistSegment
  const versus3 = segments.find(
    (s) => s.type === "playlist" && s.metadata.name === "Ranked Standard 3v3"
  ) as PlaylistSegment
  return {
    versus1: versus1 ? getRankFromSegment(versus1) : undefined,
    versus2: versus2 ? getRankFromSegment(versus2) : undefined,
    versus3: versus3 ? getRankFromSegment(versus3) : undefined,
  }
}

function getRankFromSegment(segment: PlaylistSegment): Rank {
  return {
    iconUrl: segment.stats.tier.metadata.iconUrl,
    name: segment.stats.tier.metadata.name,
    division: segment.stats.division.metadata.name,
  }
}

function GotStatsState({ stats }: GotStatsStateProps) {
  const rankedData = getRankedData(stats.segments)
  return (
    <Grid
      container
      direction="column"
      rowSpacing={2}
      sx={{ paddingTop: "20px" }}
    >
      <Grid item sx={{ margin: `0 -${globalPadding}` }}>
        <RankBoard
          versus1={rankedData.versus1}
          versus2={rankedData.versus2}
          versus3={rankedData.versus3}
        />
      </Grid>
      <Grid item>
        <LifetimeStatsCards segment={stats.segments[0] as OverviewSegment} />
      </Grid>
    </Grid>
  )
}
