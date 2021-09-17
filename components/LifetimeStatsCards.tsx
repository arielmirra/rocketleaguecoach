import React from "react"
import { Grid } from "@mui/material"
import { Stats } from "./Tracker"
import StatCard from "./StatCard"

const LifetimeStatsCards = ({ segment }) => {
  const stats: Stats = segment.stats

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
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
          <StatCard stat={stats.goalShotRatio} />
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
        <Grid item xs={6}>
          <StatCard stat={stats.seasonRewardLevel} />
        </Grid>
        <Grid item xs={6}>
          <StatCard stat={stats.seasonRewardWins} />
        </Grid>
      </Grid>
      <style jsx>{``}</style>
    </>
  )
}

export default LifetimeStatsCards
