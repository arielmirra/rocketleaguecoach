import React from "react"
import { Grid } from "@mui/material"
import { Stats, Segment } from "../models/Tracker"
import StatCard from "./StatCard"

interface Props {
  segment: Segment
}

const LifetimeStatsCards = ({ segment }: Props) => {
  const stats: Stats = segment.stats

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems='stretch'>
        <Grid item xs={6}>
          <StatCard stat={stats.wins} />
        </Grid>
        <Grid item xs={6}>
          <StatCard stat={stats.goals} />
        </Grid>
        <Grid item xs={6}>
          <StatCard stat={stats.shots} />
        </Grid>
        <Grid item xs={6}>
          <StatCard stat={stats.goalShotRatio} percentage/>
        </Grid>
        <Grid item xs={6}>
          <StatCard stat={stats.assists} />
        </Grid>
        <Grid item xs={6}>
          <StatCard stat={stats.saves} />
        </Grid>
        <Grid item xs={6}>
          <StatCard stat={stats.mVPs} />
        </Grid>
      </Grid>
      <style jsx>{``}</style>
    </>
  )
}

export default LifetimeStatsCards
