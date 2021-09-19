import React from "react"
import { Card, CardContent, Typography } from "@mui/material"
import useTranslation from "next-translate/useTranslation"
import { Stat } from "../models/Tracker"

function roundIfNecessary(n: number) {
  return Number.isInteger(n) ? n : n.toFixed(2)
}

interface Props {
  stat: Stat
  percentage?: boolean
}

const StatCard = ({ stat, percentage }: Props) => {
  const { t } = useTranslation("common")
  return (
    <>
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
      <style jsx>{``}</style>
    </>
  )
}

export default StatCard
