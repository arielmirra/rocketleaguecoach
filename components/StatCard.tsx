import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import useTranslation from "next-translate/useTranslation"
import { Stat } from "../models/Tracker"

function roundIfNecessary(n: number) {
  return Number.isInteger(n) ? n : n.toFixed(2)
}

interface Props {
  stat: Stat
  percentage?: boolean
  empty?: boolean
}

const StatCard = ({ stat, percentage, empty }: Props) => {
  const { t } = useTranslation("common")
  if (!empty) {
    return (
      <Card sx={{ height: "100%", display: "flex", placeContent: "center" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            {t(stat.displayName)}
          </Typography>
          <Typography gutterBottom variant="h5" align="center">
            {`${roundIfNecessary(stat.value)}${percentage ? " %" : ""}`}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" align="center">
            Rango mundial
          </Typography>
          <Typography variant="subtitle2" color="text.primary" align="center">
            {stat.rank || "N/A"}
          </Typography>
          <Typography variant="subtitle2" color="text.primary" align="center">
            Top{" "}
            {stat.percentile
              ? `${roundIfNecessary(100 - stat.percentile)}%`
              : "N/A"}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          placeContent: "center",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            No se encuentran estadísticas
          </Typography>
          <Typography variant="subtitle1" color="text.primary" align="center">
            Prueba vincular tu cuenta de Epic Games en la
            <a href="https://www.rocketleague.com/activate/">
              {" "}
              página de Rocket League
            </a>
            .
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default StatCard
