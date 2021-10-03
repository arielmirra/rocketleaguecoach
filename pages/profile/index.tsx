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
import Create from "@mui/icons-material/Create"
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
import EpicIDModal from "../../components/EditEpicIDModal"

async function getTrackerStats(epicID: string): Promise<TrackerStats | null> {
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
      return null
    } else return data.data
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
                <Create />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

const ProfilePage = () => {
  const authUser = useAuthUser()
  const [isModalOpen, setModalOpened] = useState(false)
  const [epicID, setEpicID] = useState<RemoteData.RemoteData<string>>(
    RemoteData.notAsked()
  )
  const [stats, setStats] = useState<
    RemoteData.RemoteData<TrackerStats | null>
  >(RemoteData.notAsked())

  const getSavedEpicId = async () => {
    setEpicID(RemoteData.loading())
    const epicID = await getEpicIDFromId(authUser.id || "")
    setEpicID(RemoteData.present(epicID))
    formik.values.epicID = epicID
  }

  const fetchStats = async (epicID: string) => {
    setStats(RemoteData.loading())
    const statistics = await getTrackerStats(epicID)
    if (statistics) {
      setStats(RemoteData.present(statistics))
    } else {
      setStats(RemoteData.present(null))
    }
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
      await saveEpicID(authUser.id, values.epicID)
      closeModal()
      setEpicID(RemoteData.present(values.epicID))
    },
  })

  return (
    <>
      <Header
        name={authUser.displayName}
        photoURL={authUser.photoURL}
        epicID={epicID}
        onEditEpicID={openModal}
      />
      {epicID.state === "present" && epicID.data === "" && (
        <div className="center-content">
          <MatButton onClick={openModal} text="Ingresá tu Epic ID" />
        </div>
      )}
      {stats.state === "present" && stats.data === null && (
        <GotStatsState trackerStats={{ segments: [] }} />
      )}
      {stats.state === "present" && stats.data && (
        <GotStatsState trackerStats={stats.data} />
      )}
      {(stats.state === "loading" || epicID.state === "loading") && (
        <div className="center-content">
          <CircularProgress />
        </div>
      )}
      <EpicIDModal
        isOpen={isModalOpen}
        onClose={closeModal}
        submitting={epicID.state === "loading"}
        formik={formik}
      />
      <MatButton
        text={"Cerrar Sesión"}
        color={"error"}
        sx={{ marginTop: 4 }}
        onClick={() => authUser.signOut()}
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
  trackerStats: TrackerStats
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

function GotStatsState({ trackerStats }: GotStatsStateProps) {
  if (trackerStats.segments.length > 0) {
    const rankedData = getRankedData(trackerStats.segments)
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
          <LifetimeStatsCards
            segment={trackerStats.segments[0] as OverviewSegment}
          />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid
        container
        direction="column"
        rowSpacing={2}
        sx={{ paddingTop: "20px" }}
      >
        <Grid item sx={{ margin: `0 -${globalPadding}` }}>
          <RankBoard />
        </Grid>
        <Grid item>
          <LifetimeStatsCards
            segment={trackerStats.segments[0] as OverviewSegment}
          />
        </Grid>
      </Grid>
    )
  }
}
