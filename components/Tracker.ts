import { Type } from "class-transformer"

export class TrackerStats {
  @Type(() => Segment)
  segments: Segment[]
}

export class Segment {
  attributes: any
  metadata: Metadata
  stats: Stats
  type: string
}

export class Stats {
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

export class Stat {
  category: string
  displayName: string
  rank: number
  percentile: number
  metadata: Metadata
  value: number
}

export class Metadata {
  name: string
}

export class Attributes {
  playlistId: number
  season: number
}
