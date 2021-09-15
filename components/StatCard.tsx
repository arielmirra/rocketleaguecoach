import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import { Segment, Stat, Stats } from "./Tracker"
import { plainToClass } from "class-transformer"

const StatCard = ({ segment }) => {
  const stats: Stats = segment.stats
  const stat = stats.goals

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image="/vercel.svg"
            alt="card media"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {stat.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.value}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <style jsx>{``}</style>
    </>
  )
}

export default StatCard
