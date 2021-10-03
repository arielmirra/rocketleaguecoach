import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { grey } from "@mui/material/colors"
import { Playlist, Rank as RankData } from "../models/Tracker"

interface RankProps {
  playlist: Playlist
  rank?: RankData
}

interface RankBoardProps {
  versus3?: RankData
  versus2?: RankData
  versus1?: RankData
}

function Rank({ playlist, rank }: RankProps) {
  const rankedString = "Ranked "
  const withoutRanked = playlist.includes(rankedString)
    ? playlist.substring(rankedString.length)
    : playlist
  const validRank = rank || unrankedRank
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography>{withoutRanked}</Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{ height: 100, width: 100 }}
            src={validRank.iconUrl}
            alt={validRank.name}
            title={validRank.name}
            variant="square"
          />
        </Grid>
        <Grid item>
          <Typography>{validRank.division}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

const unrankedRank = {
  iconUrl: "https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png",
  name: "Unranked",
  division: "N/A",
}

function RankBoard({ versus3, versus2, versus1 }: RankBoardProps) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="stretch"
      sx={{ bgcolor: grey[100], padding: "20px" }}
    >
      <Grid item>
        <Rank playlist="Ranked Duel 1v1" rank={versus1} />
      </Grid>
      <Grid item>
        <Divider orientation="vertical" variant="middle" sx={{ margin: 0 }} />
      </Grid>
      <Grid item>
        <Rank playlist="Ranked Doubles 2v2" rank={versus2} />
      </Grid>
      <Grid item>
        <Divider orientation="vertical" variant="middle" sx={{ margin: 0 }} />
      </Grid>
      <Grid item>
        <Rank playlist="Ranked Standard 3v3" rank={versus3} />
      </Grid>
    </Grid>
  )
}

export default RankBoard
