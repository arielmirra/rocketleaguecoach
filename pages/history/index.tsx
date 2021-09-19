import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth"
import Loader from "../../components/Loader"
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material"
import { AccessTime as AccessTimeIcon } from "@mui/icons-material"
import { CompletedSession, randomCompletedSession } from "../../utils/session"
import { globalPadding } from "../../styles/styles"
import { useRouter } from "next/router"
import { useState } from "react"

function buildDummySessions(amt: number): CompletedSession[] {
  return Array(amt)
    .fill(0)
    .map(() => randomCompletedSession())
}

const dummies = buildDummySessions(10)

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
  const AuthUser = useAuthUser()
  const sessions = dummies
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function redirectToSession(id: string) {
    setLoading(true)
    router.push(`/history/${id}`)
  }

  if (loading) return <Loader />

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
            <ListItem
              key={i}
              button
              divider={i !== sessions.length - 1}
              onClick={() => redirectToSession(s.id)}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeIcon />
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
