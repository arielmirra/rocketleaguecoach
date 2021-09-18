export interface TrackerStats {
  segments: Segment[]
}

export interface Segment {
  attributes: any
  metadata: Metadata
  stats: Stats
  type: string
}

export interface Stats {
  // overview stats
  assists: Stat
  goalShotRatio: Stat
  goals: Stat
  mVPs: Stat
  saves: Stat
  score: Stat
  seasonRewardLevel: Stat
  seasonRewardWins: Stat
  shots: Stat
  tRNRating: Stat
  wins: Stat

  // playlist stats
  division: Stat
  matchesPlayed: Stat
  rating: Stat
  tier: Stat
  winStreak: Stat
}

export interface Stat {
  category: string
  displayName: string
  rank: number
  percentile: number
  metadata: Metadata
  value: number
}

export interface Metadata {
  name: string
}

export interface Attributes {
  playlistId: number
  season: number
}
