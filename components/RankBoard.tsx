import { Grid, Typography, Divider, Avatar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { grey } from "@mui/material/colors"

interface RankData {
  iconUrl: string
  name: string
  division: string
}

interface RankProps {
  rank: RankData
}

interface RankBoardProps {
  versus3?: RankData
  versus2?: RankData
  versus1?: RankData
}

const useStyles = makeStyles(() => ({
  rankImage: {
    height: "100px",
    width: "100px",
  },
}))

function Rank({ rank }: RankProps) {
  const classes = useStyles()
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography>{rank.name}</Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{ height: 100, width: 100 }}
            src={rank.iconUrl}
            alt={rank.name}
            title={rank.name}
          />
        </Grid>
        <Grid item>
          <Typography>{rank.division}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

const dummyRank = {
  iconUrl: "https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-8.png",
  name: "Gold II",
  division: "Division III",
}

function RankBoard({ versus3, versus2, versus1 }: RankBoardProps) {
  return (
      <Grid container direction="row" justifyContent="space-around" alignItems='stretch' sx={{bgcolor: grey[100], padding: '20px'}}>
        <Grid item>
          <Rank rank={dummyRank} />
        </Grid>
        <Grid item>
          <Divider orientation="vertical" variant="middle" sx={{margin: 0}}/>
        </Grid>
        <Grid item>
          <Rank rank={dummyRank} />
        </Grid>
        <Grid item>
          <Divider orientation="vertical" variant="middle" sx={{margin: 0}}/>
        </Grid>
        <Grid item>
          <Rank rank={dummyRank} />
        </Grid>
      </Grid>
  )
}

export default RankBoard
