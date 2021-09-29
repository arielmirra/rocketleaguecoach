import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import Loader from "../../components/Loader"
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material"
import AccessTime from "@mui/icons-material/AccessTime"
import Cancel from "@mui/icons-material/Cancel"
import { CompletedSession } from "../../utils/session"
import { globalPadding } from "../../styles/styles"
import { useEffect, useState } from "react"
import { getPlayerSessions } from "../../firebase/client"
import Link from "next/link"

function minutesToHsAndMinutesSpanish(min: number): string {
  const hours = Math.floor(min / 60)
  const minutes = min % 60
  let result = ""
  if (hours) {
    result += `${hours} hs`
  }
  if (minutes) {
    if (result) result += " "
    result += `${minutes} min`
  }
  return result
}

const HistoryPage = () => {
  const authUser = useAuthUser()
  const [sessions, setSessions] = useState<CompletedSession[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPlayerSessions(authUser.id || "").then((ss) => {
      setSessions(ss)
      console.log(ss)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loader />
  } else if (sessions.length === 0) {
    return (
      <>
        <div
          style={{
            marginLeft: `-${globalPadding}`,
            marginRight: `-${globalPadding}`,
          }}
        >
          <List sx={{ width: "100%" }}>
            <ListItem button divider={false}>
              <ListItemAvatar>
                <Avatar>
                  <Cancel />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={"No se han encontrado sesiones"}
                secondary={"¡A entrenar!"}
              />
            </ListItem>
          </List>
        </div>
      </>
    )
  } else
    return (
      <>
        <div
          style={{
            marginLeft: `-${globalPadding}`,
            marginRight: `-${globalPadding}`,
          }}
        >
          <List sx={{ width: "100%" }}>
            {sessions.map((s, i) => (
              <Link href={`/history/${s.id}`} key={i} passHref>
                <ListItem key={i} button divider={i !== sessions.length - 1}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccessTime />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={minutesToHsAndMinutesSpanish(s.session.duration)}
                    secondary={new Date(s.date).toLocaleDateString("es-AR", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </>
    )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(HistoryPage)
