export type Playlist =
  | "Un-Ranked"
  | "Ranked Duel 1v1"
  | "Ranked Doubles 2v2"
  | "Ranked Standard 3v3"

export interface TrackerStats {
  segments: Segment[]
}

export interface Rank {
  iconUrl: string
  name: string
  division: string
}

export interface OverviewSegment {
  type: "overview"
  attributes: any
  metadata: Metadata
  stats: OverviewStats
}

export interface PlaylistSegment {
  type: "playlist"
  attributes: any
  metadata: {
    name: Playlist
  }
  stats: PlaylistStats
}

export type Segment = OverviewSegment | PlaylistSegment

export interface OverviewStats {
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
}

export interface PlaylistStats {
  division: Stat
  matchesPlayed: Stat
  rating: Stat
  tier: Tier
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

export function emptyStat(): Stat {
  return {
    category: "N/A",
    displayName: "N/A",
    rank: 0,
    percentile: 100,
    metadata: { name: "N/A" },
    value: 0,
  }
}

export interface Metadata {
  name: string
}

export interface Tier extends Stat {
  metadata: TierMetadata
}

export interface TierMetadata extends Metadata {
  iconUrl: string
}
