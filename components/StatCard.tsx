import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import useTranslation from "next-translate/useTranslation"
import { Stat } from "../models/Tracker"

function roundIfNecessary(n: number) {
  return Number.isInteger(n) ? n : n.toFixed(2)
}

interface Props {
  stat: Stat
}

function StatCard({ stat }: Props) {
  const { t } = useTranslation("common")
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {t(stat.displayName)}: {roundIfNecessary(stat.value)}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Rango mundial: {stat.rank} (Top{" "}
              {roundIfNecessary(100 - stat.percentile)}%)
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <style jsx>{``}</style>
    </>
  )
}

export default StatCard
